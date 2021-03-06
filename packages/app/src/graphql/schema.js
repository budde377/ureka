// @flow

import { makeExecutableSchema } from 'graphql-tools'
import typeDefs from '../../graphql/schema.graphqls'
import * as DB from '../db'
import type Db from '../db'
import { randomBytes } from '../utils'
import base64url from 'urlsafe-base64'
import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import { GraphQLUpload } from 'apollo-upload-server'
import sizeOf from 'image-size'

export type Context = {
  db: Db,
  authorized: boolean,
}

type Resolver<Info, Args: {}, Res> = (info: Info, args: Args, context: Context) => Res | Promise<Res>

type InterfaceResolver<T> = {|
  __resolveType: Resolver<void, {}, ?(T)>
|}

function toBuffer (s: stream$Stream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const buffers = []
    s.on('data', (buffer) => {
      buffers.push(buffer)
    })
    s.on('end', () => {
      const buffer = Buffer.concat(buffers)
      resolve(buffer)
    })
    s.on('error', reject)
  })
}

type Upload = {
  stream: stream$Stream,
  filename: string,
  mimetype: string,
  encoding: string
}

type Resolvers = {|
  Pdf: {|
    url: Resolver<DB.File, {}, string>
  |},
  Image: {|
    url: Resolver<DB.File, {}, string>
  |},
  File: InterfaceResolver<'Image' | 'Pdf'>,
  PageInfo: {|
    hasPreviousPage: Resolver<void, {}, boolean>
  |},
  Annotation: {|
    id: Resolver<DB.Annotation, {}, string>,
  |},
  Query: {|
    projects: Resolver<void, { first: number, after?: DB.Cursor }, DB.PaginationResult<DB.Project>>,
    project: Resolver<void, { id: string }, ?DB.Project>,
    application: Resolver<void, { id: string, project: string }, ?DB.Application>
  |},
  Mutation: {|
    createProject: Resolver<void, { name: string }, DB.Project>,
    updateProject: Resolver<void, { id: string, name?: string }, DB.Project>,
    deleteProject: Resolver<void, { id: string }, {| deleted: number |}>,
    createApplication: Resolver<void, { project: string, name: string, type: DB.ApplicationType, file: Promise<Upload> }, DB.Application>,
    deleteApplication: Resolver<void, { id: string }, {| deleted: number |}>,
    updateApplication: Resolver<void, { id: string, name?: string, type?: DB.ApplicationType }, DB.Application>,
    createReport: Resolver<void, { project: string, name: string, file: Promise<Upload> }, DB.Report>,
    deleteReport: Resolver<void, { id: string }, {| deleted: number |}>,
    updateReport: Resolver<void, { id: string, name?: string }, DB.Report>,
    createAnnotation: Resolver<void, { application: string, x: number, y: number, width: number, height: number, description: string, type: DB.AnnotationType }, DB.Annotation>,
    deleteAnnotation: Resolver<void, { id: string }, {| deleted: number |}>,
    updateAnnotation: Resolver<void, { id: string, x: number, y: number, width?: number, height?: number, description?: string, type?: DB.AnnotationType }, DB.Annotation>
  |},
  Project: {|
    id: Resolver<DB.Project, {}, string>,
    reports: Resolver<DB.Project, {}, DB.Report[]>,
    applications: Resolver<DB.Project, {}, DB.Application[]>
  |},
  Report: {|
    id: Resolver<DB.Report, {}, string>,
    document: Resolver<DB.Report, {}, DB.File>
  |},
  Application: {|
    id: Resolver<DB.Application, {}, string>,
    screenshot: Resolver<DB.Application, {}, DB.File>,
    annotations: Resolver<DB.Application, {}, DB.Annotation[]>,
  |},
  Cursor: GraphQLScalarType,
  Upload: GraphQLScalarType
|}

const Query = {
  async application (info, {id, project}, {db}) {
    const p = await db.projectByPublicId(project)
    if (!p) {
      return null
    }
    const i = db.id(id)
    if (!i) {
      return null
    }
    return db.applicationByProjectAndId(p._id, i)
  },
  async project (info, {id}, {db}) {
    return db.projectByPublicId(id)
  },
  async projects (info, {first, after}, {db}) {
    return db.projects(first, after)
  }
}

const File = {
  __resolveType (obj, context, info) {
    return null
  }
}

const PageInfo = {
  hasPreviousPage () {
    return false
  }
}

async function randomId (): Promise<string> {
  const randomness = await randomBytes(32)
  return base64url.encode(randomness)
}

const Mutation = {
  async createProject (i, {name}, {db, authorized}) {
    if (!authorized) throw new Error('Not authorized')
    const publicId = await randomId()
    const id = await db.createProject({name, publicId})
    const p = await db.project(id)
    if (!p) throw new Error('Internal error!')
    return p
  },
  async createReport (i, args, {db, authorized}) {
    if (!authorized) throw new Error('Not authorized')
    const {stream, mimetype} = await args.file
    if (mimetype !== 'application/pdf') {
      throw new Error('Unsupported file type.')
    }
    const project = await db.projectByPublicId(args.project)
    if (!project) {
      throw new Error('Project not found')
    }
    const data = await toBuffer(stream)
    const publicId = await randomId()
    const reportId = await db.createReport({
      name: args.name,
      project: project._id
    })
    await db.createPdf({
      kind: 'pdf',
      publicId,
      report: reportId,
      project: project._id,
      data
    })
    const report: ?DB.Report = await db.report(reportId)
    if (!report) {
      throw new Error('Internal error')
    }
    return report
  },
  async createApplication (i, args, {db, authorized}) {
    if (!authorized) throw new Error('Not authorized')
    const {stream} = await args.file
    const project = await db.projectByPublicId(args.project)
    if (!project) {
      throw new Error('Project not found')
    }
    const data = await toBuffer(stream)
    let dimensions
    try {
      dimensions = sizeOf(data)
    } catch (err) {
      console.warn(err)
      throw new Error('Invalid file.')
    }
    const {height, width, type} = dimensions
    if (type !== 'png' && type !== 'jpg') {
      throw new Error(`Unsupported file type "${dimensions.type}".`)
    }
    const appId = await db.createApp({
      name: args.name,
      type: args.type,
      project: project._id
    })
    const publicId = await randomId()
    await db.createImage({
      data,
      application: appId,
      height,
      width,
      kind: 'image',
      project: project._id,
      type,
      publicId,
    })
    const app: ?DB.Application = await db.application(appId)
    if (!app) {
      throw new Error('Internal error')
    }
    return app
  },
  async createAnnotation (i, args, {db, authorized}) {
    if (!authorized) throw new Error('Not authorized')
    const id = db.id(args.application)
    const app = id && await db.application(id)
    if (!app) {
      throw new Error('App not found')
    }
    const {type, description, x, y, width, height} = args
    const annId = await db.createAnnotation({
      type,
      description,
      x,
      y,
      width,
      height,
      application: app._id,
      project: app.project
    })
    const ann = await db.annotation(annId)
    if (!ann) {
      throw new Error('Internal error')
    }
    return ann
  },
  async deleteProject (i, {id}, {db, authorized}) {
    if (!authorized) throw new Error('Not authorized')
    const project = await db.projectByPublicId(id)
    if (!project) {
      return {deleted: 0}
    }
    await db.deleteFileByProject(project._id)
    await db.deleteReportByProject(project._id)
    await db.deleteAnnotationByProject(project._id)
    return await db.deleteProject(project._id)
  },
  async deleteReport (_, {id}, {db, authorized}) {
    if (!authorized) throw new Error('Not authorized')
    const i = db.id(id)
    if (!i) {
      return {deleted: 0}
    }
    const res = await db.deleteReport(i)
    await db.deleteFileByReport(i)
    return res
  },
  async deleteApplication (_, {id}, {db, authorized}) {
    if (!authorized) throw new Error('Not authorized')
    const i = db.id(id)
    if (!i) {
      return {deleted: 0}
    }
    const res = await db.deleteApplication(i)
    await db.deleteFileByApplication(i)
    await db.deleteAnnotationByApp(i)
    return res
  },
  async deleteAnnotation (_, {id}, {db, authorized}) {
    if (!authorized) throw new Error('Not authorized')
    const i = db.id(id)
    if (!i) {
      return {deleted: 0}
    }
    return db.deleteAnnotation(i)
  },
  async updateProject (_, {id, name}, {db, authorized}) {
    if (!authorized) throw new Error('Not authorized')
    const p = await db.projectByPublicId(id)
    if (!p) {
      throw new Error('Project not found')
    }
    const o = {}
    if (name) {
      o.name = name
    }
    await db.updateProject(p._id, o)
    const updatedP = await db.project(p._id)
    if (!updatedP) {
      throw new Error('Internal error')
    }
    return updatedP
  },
  async updateReport (_, {id, name}, {db, authorized}) {
    if (!authorized) throw new Error('Not authorized')
    const i = db.id(id)
    const report = i && await db.report(i)
    if (!report) throw new Error('Report not found')
    await db.updateReport(report._id, {name})
    const updated = await db.report(report._id)
    if (!updated) throw new Error('Internal error')
    return updated
  },
  async updateApplication (_, {id, name, type}, {db, authorized}) {
    if (!authorized) throw new Error('Not authorized')
    const i = db.id(id)
    const application = i && await db.application(i)
    if (!application) throw new Error('Application not found')
    const update = {}
    if (name) {
      update.name = name
    }
    if (type) {
      update.type = type
    }
    await db.updateApplication(application._id, update)
    const updated = await db.application(application._id)
    if (!updated) throw new Error('Internal error')
    return updated
  },
  async updateAnnotation (_, args, {db, authorized}) {
    if (!authorized) throw new Error('Not authorized')
    const i = db.id(args.id)
    const application = i && await db.annotation(i)
    if (!application) throw new Error('Annotation not found')
    const update = {}
    if (args.x !== undefined) {
      update.x = args.x
    }
    if (args.y !== undefined) {
      update.y = args.y
    }
    if (args.width !== undefined) {
      update.width = args.width
    }
    if (args.height !== undefined) {
      update.height = args.height
    }
    if (args.description !== undefined) {
      update.description = args.description
    }
    if (args.type !== undefined) {
      update.type = args.type
    }
    await db.updateAnnotation(application._id, update)
    const updated = await db.annotation(application._id)
    if (!updated) throw new Error('Internal error')
    return updated
  }
}

const Project = {
  id (project) {
    return project.publicId
  },
  applications (project, {first, after}, {db}) {
    return db.applicationsForProject(project._id)
  },
  reports (project, {first, after}, {db}) {
    return db.reportsForProject(project._id)
  }
}

const Report = {
  id (report) {
    return report._id.toString()
  },
  async document (report, {}, {db}) {
    const doc = await db.fileByReport(report._id)
    if (!doc) {
      throw new Error('Internal server error')
    }
    return doc
  }
}
const Annotation = {
  id (annotation) {
    return annotation._id.toString()
  }
}

const Application = {
  id (report) {
    return report._id.toString()
  },
  async screenshot (app, {}, {db}) {
    const doc = await db.fileByApp(app._id)
    if (!doc) {
      throw new Error('Internal server error')
    }
    return doc
  },
  async annotations (app, {}, {db}) {
    return db.annotationsByApp(app._id)
  }
}

const Pdf = {
  url (file) {
    return `/files/${file.publicId}`
  }
}

const Image = {
  url (file) {
    return `/files/${file.publicId}`
  }
}

const resolvers: Resolvers = {
  File,
  Query,
  Pdf,
  Image,
  PageInfo,
  Mutation,
  Project,
  Application,
  Annotation,
  Report,
  Upload: GraphQLUpload,
  Cursor: new GraphQLScalarType({
    name: 'Cursor',
    description: 'Odd custom scalar type',
    parseValue: v => v,
    serialize: v => v,
    parseLiteral (ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10)
      }
      throw new Error('Invalid cursor')
    },
  }),
}

export default makeExecutableSchema({typeDefs, resolvers})
