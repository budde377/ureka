// @flow

import React from 'react'
import styled from 'styled-components'

export const Icon = styled.svg`
`

export const DesktopIcon = styled(({className}) => (
  <Icon className={className} width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
        clipRule="evenodd" viewBox='0 0 24 24'>
    <path d="M5 22h4v-3h-9v-18h24v18h-10v3h4v1h-13v-1zm5-3v3h3v-3h-3zm13-17h-22v16h22v-16z" />
  </Icon>
))``

export const LogoIcon = styled(props => (
  <Icon {...props} viewBox="0 0 214 214" version="1.1" xmlns="http://www.w3.org/2000/svg"
       xmlnsXlink="http://www.w3.org/1999/xlink">
    <g id="Symbols" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Logo">
        <circle id="Mask" fill="#039BE5" cx="107" cy="107" r="107" />
        <g id="Group" transform="translate(25.000000, 59.000000)">
          <path
            d="M0,116.74253 L0,0 L165,0 L165,115.533121 C145.379965,139.617451 115.486376,155 82,155 C49.0775834,155 19.6279572,140.131217 8.8817842e-15,116.74253 Z"
            id="Combined-Shape" fill="#FFFFFF" />
          <rect id="Rectangle-2" fill="#FFCDCD" x="50" y="55" width="105" height="24" />
          <path
            d="M14,130.617477 L14,103 L83,103 L83,154.995424 C82.6670278,154.998472 82.3336923,155 82,155 C56.1750195,155 32.4868944,145.851034 14,130.617477 Z"
            id="Combined-Shape" fill="#95D9EA" />
          <rect id="Rectangle-3" fill="#F7DD83" x="11" y="15" width="143" height="20" />
        </g>
      </g>
    </g>
  </Icon>
))``

export const MobileIcon = styled(({className}) => (
    <Icon className={className} viewBox="0 0 18 27" version="1.1" xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink">
      <g id="Welcome" stroke="none" strokeWidth="1" fillRule="evenodd">
        <path d="M0,0 L18,0 L18,27 L0,27 L0,0 Z M1,1 L1,24 L17,24 L17,1 L1,1 Z" id="Combined-Shape" />
      </g>
    </Icon>
  )
)``

export const DocIcon = styled(({className}) => (
  <Icon className={className} viewBox="0 0 22 28" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g id="Welcome" stroke="none" strokeWidth="1" fillRule="evenodd">
      <path
        d="M0,0 L22,0 L22,28 L0,28 L0,0 Z M0.840764331,0.844221106 L0.840764331,27.0619765 L21.1592357,27.0619765 L21.1592357,0.844221106 L0.840764331,0.844221106 Z"
        id="Combined-Shape" />
      <rect id="Rectangle-6" x="1.82165605" y="3.84589615" width="11.163482" height="1.54773869" />
      <rect id="Rectangle-6" x="1.82165605" y="7.64489112" width="15.3205945" height="1.54773869" />
      <rect id="Rectangle-6" x="6.02547771" y="11.3969849" width="11.163482" height="1.54773869" />
      <rect id="Rectangle-7" x="1.82165605" y="11.4438861" width="2.80254777" height="1.54773869" />
      <rect id="Rectangle-8" x="14.0127389" y="15.0083752" width="5.83864119" height="1.54773869" />
      <rect id="Rectangle-6" x="1.82165605" y="15.1490787" width="11.163482" height="1.54773869" />
      <rect id="Rectangle-6" x="1.82165605" y="18.9480737" width="14.5732484" height="1.54773869" />
      <rect id="Rectangle-6" x="1.82165605" y="22.7001675" width="9.20169851" height="1.54773869" />
      <rect id="Rectangle-11" x="14.7600849" y="3.89279732" width="4.53078556" height="1.54773869" />
    </g>
  </Icon>
))``

export const ProjectIcon = styled(({className}) => (
  <Icon className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
        fillRule="evenodd"
        clipRule="evenodd">
    <path d="M11 5h13v17h-24v-20h8l3 3zm-10-2v18h22v-15h-12.414l-3-3h-6.586z" />
  </Icon>
))``

export const TrashIcon = styled(props => (
  <Icon
    {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
    clipRule="evenodd">
    <path
      d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z" />
  </Icon>
))``

export const UploadIcon = styled(({className}) => (
  <Icon className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
        clipRule="evenodd">
    <path
      d="M11.492 10.172l-2.5 3.064-.737-.677 3.737-4.559 3.753 4.585-.753.665-2.5-3.076v7.826h-1v-7.828zm7.008 9.828h-13c-2.481 0-4.5-2.018-4.5-4.5 0-2.178 1.555-4.038 3.698-4.424l.779-.14.043-.789c.185-3.448 3.031-6.147 6.48-6.147 3.449 0 6.295 2.699 6.478 6.147l.044.789.78.14c2.142.386 3.698 2.246 3.698 4.424 0 2.482-2.019 4.5-4.5 4.5m.978-9.908c-.212-3.951-3.472-7.092-7.478-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.522-5.408" />
  </Icon>
))``

export const AddIcon = styled(({className}) => (
  <Icon className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
        clipRule="evenodd">
    <path
      d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z" />
  </Icon>
))``


export const PlusIcon = styled(({className}) => (
  <Icon className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
        clipRule="evenodd">
    <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z"/>
  </Icon>
))``

export const EditIcon = styled(props => (
  <Icon {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
        clipRule="evenodd">
    <path
      d="M8.071 21.586l-7.071 1.414 1.414-7.071 14.929-14.929 5.657 5.657-14.929 14.929zm-.493-.921l-4.243-4.243-1.06 5.303 5.303-1.06zm9.765-18.251l-13.3 13.301 4.242 4.242 13.301-13.3-4.243-4.243z" />
  </Icon>
))``

export const CloseIcon = styled(props => (
  <Icon
    {...props}
    viewBox='0 0 24 24' xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd">
    <path
      d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z" />
  </Icon>
))`

`
export const CheckmarkIcon = styled(props => (
  <Icon
    {...props}
    viewBox='0 0 24 24' xmlns="http://www.w3.org/2000/svg" fillRule="evenodd"
    clipRule="evenodd">
    <path d="M24 4.685l-16.327 17.315-7.673-9.054.761-.648 6.95 8.203 15.561-16.501.728.685z" />
  </Icon>))``
