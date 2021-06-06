import { SvgIcon } from "@material-ui/core";

export const ActiveUser = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="16" fill="#159D74" />
      <path d="M23.6515 24.4054C24.2044 24.2902 24.5336 23.7117 24.2589 23.2183C23.6533 22.1307 22.6993 21.1749 21.4789 20.4465C19.9071 19.5085 17.9812 19 16 19C14.0188 19 12.093 19.5085 10.5212 20.4465C9.30072 21.1749 8.34669 22.1307 7.74111 23.2183C7.46641 23.7117 7.79565 24.2902 8.34847 24.4054V24.4054C13.3953 25.4572 18.6047 25.4572 23.6515 24.4054V24.4054Z" fill="white"/>
      <circle cx="16" cy="12" r="5" fill="white"/>
    </SvgIcon>
  )
} 

export const NonActiveUser = (props) => {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <path d="M23.7274 24.4471C23.2716 23.1713 22.2672 22.0439 20.8701 21.2399C19.4729 20.4358 17.7611 20 16 20C14.2389 20 12.5271 20.4358 11.1299 21.2399C9.73276 22.0439 8.72839 23.1713 8.27259 24.4471" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" fill="white"/>
      <circle cx="16" cy="12" r="4" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" fill="white"/>
    </SvgIcon>
  )
} 

export const ActiveApartment = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#159D74"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.27446 13.1262C9 13.7229 9 14.4018 9 15.7595V19.9999C9 21.8856 9 22.8284 9.58579 23.4142C10.1173 23.9457 10.9428 23.9949 12.5 23.9995V19C12.5 17.8954 13.3954 17 14.5 17H17.5C18.6046 17 19.5 17.8954 19.5 19V23.9995C21.0572 23.9949 21.8827 23.9457 22.4142 23.4142C23 22.8284 23 21.8856 23 19.9999V15.7595C23 14.4018 23 13.7229 22.7255 13.1262C22.4511 12.5294 21.9356 12.0876 20.9047 11.204L19.9047 10.3469C18.0414 8.74974 17.1098 7.95117 16 7.95117C14.8902 7.95117 13.9586 8.74974 12.0953 10.3469L11.0953 11.204C10.0644 12.0876 9.54892 12.5294 9.27446 13.1262ZM17.5 23.9999V19H14.5V23.9999H17.5Z" fill="white"/>
      </SvgIcon>
    )
  } 

  export const NonActiveApartment = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <path d="M9 15.7596C9 14.4019 9 13.723 9.27446 13.1262C9.54892 12.5295 10.0644 12.0877 11.0953 11.2041L12.0953 10.3469C13.9586 8.7498 14.8902 7.95123 16 7.95123C17.1098 7.95123 18.0414 8.7498 19.9047 10.3469L20.9047 11.2041C21.9356 12.0877 22.4511 12.5295 22.7255 13.1262C23 13.723 23 14.4019 23 15.7596V20C23 21.8856 23 22.8284 22.4142 23.4142C21.8284 24 20.8856 24 19 24H13C11.1144 24 10.1716 24 9.58579 23.4142C9 22.8284 9 21.8856 9 20V15.7596Z" stroke="#5C5C5C" stroke-width="2" fill="white"/>
        <path d="M18.5 24V19C18.5 18.4477 18.0523 18 17.5 18H14.5C13.9477 18 13.5 18.4477 13.5 19V24" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="white"/>
      </SvgIcon>
    )
  } 

  export const ActiveAnnouncement = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#159D74"/>
        <path d="M16 26V23" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M10.083 12H13C13.5523 12 14 12.4477 14 13C14 13.5523 13.5523 14 13 14H10V16H13C13.5523 16 14 16.4477 14 17C14 17.5523 13.5523 18 13 18H10.083C10.559 20.8377 13.027 23 16 23C18.973 23 21.441 20.8377 21.917 18H20C19.4477 18 19 17.5523 19 17C19 16.4477 19.4477 16 20 16H22V14H20C19.4477 14 19 13.5523 19 13C19 12.4477 19.4477 12 20 12H21.917C21.441 9.16229 18.973 7 16 7C13.027 7 10.559 9.16229 10.083 12Z" fill="white"/>
      </SvgIcon>
    )
  } 

  export const NonActiveAnnouncement = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <rect x="10" y="7" width="12" height="16" rx="6" stroke="#5C5C5C" stroke-width="2" stroke-linejoin="round" fill="white"/>
        <path d="M16 26V23" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14 17H11" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M22 17H20" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M14 13H11" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M22 13H20" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </SvgIcon>
    )
  } 

  export const ActiveClaims = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#159D74"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 6C12.3431 6 11 7.34315 11 9V9.00068C9.92115 9.00539 9.32954 9.04261 8.88886 9.33706C8.67048 9.48298 8.48298 9.67048 8.33706 9.88886C8 10.3933 8 11.0955 8 12.5V22C8 23.8856 8 24.8284 8.58579 25.4142C9.17157 26 10.1144 26 12 26H20C21.8856 26 22.8284 26 23.4142 25.4142C24 24.8284 24 23.8856 24 22V12.5C24 11.0955 24 10.3933 23.6629 9.88886C23.517 9.67048 23.3295 9.48298 23.1111 9.33706C22.6705 9.04261 22.0789 9.00539 21 9.00068V9C21 7.34315 19.6569 6 18 6H14ZM14 9C14 8.44772 14.4477 8 15 8H17C17.5523 8 18 8.44772 18 9C18 9.55228 17.5523 10 17 10H15C14.4477 10 14 9.55228 14 9ZM13 15C12.4477 15 12 15.4477 12 16C12 16.5523 12.4477 17 13 17H19C19.5523 17 20 16.5523 20 16C20 15.4477 19.5523 15 19 15H13ZM13 19C12.4477 19 12 19.4477 12 20C12 20.5523 12.4477 21 13 21H17C17.5523 21 18 20.5523 18 20C18 19.4477 17.5523 19 17 19H13Z" fill="white"/>
      </SvgIcon>
    )
  } 

  export const NonActiveClaims = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <path d="M19.5 8C20.9045 8 21.6067 8 22.1111 8.33706C22.3295 8.48298 22.517 8.67048 22.6629 8.88886C23 9.39331 23 10.0955 23 11.5V21C23 22.8856 23 23.8284 22.4142 24.4142C21.8284 25 20.8856 25 19 25H13C11.1144 25 10.1716 25 9.58579 24.4142C9 23.8284 9 22.8856 9 21V11.5C9 10.0955 9 9.39331 9.33706 8.88886C9.48298 8.67048 9.67048 8.48298 9.88886 8.33706C10.3933 8 11.0955 8 12.5 8" stroke="#5C5C5C" stroke-width="2" fill="white"/>
        <path d="M13 8C13 6.89543 13.8954 6 15 6H17C18.1046 6 19 6.89543 19 8C19 9.10457 18.1046 10 17 10H15C13.8954 10 13 9.10457 13 8Z" stroke="#5C5C5C" stroke-width="2" fill="white"/>
        <path d="M13 15L19 15" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round"/>
        <path d="M13 19L17 19" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round"/>
      </SvgIcon>
    )
  } 

  export const ActiveRequest = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#159D74"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.33579 7.41904C7.75 8.00482 7.75 8.94763 7.75 10.8333V19.1666C7.75 21.995 7.75 23.4092 8.62868 24.2879C9.21045 24.8697 10.027 25.0663 11.3333 25.1327V22.4166C11.3333 21.8643 11.7811 21.4166 12.3333 21.4166C12.8856 21.4166 13.3333 21.8643 13.3333 22.4166V25.1665C13.4687 25.1666 13.6076 25.1666 13.75 25.1666H18.25C18.3924 25.1666 18.5313 25.1666 18.6667 25.1665L18.6667 22.4166C18.6667 21.8643 19.1144 21.4166 19.6667 21.4166C20.219 21.4166 20.6667 21.8643 20.6667 22.4166L20.6667 25.1327C21.973 25.0663 22.7895 24.8697 23.3713 24.2879C24.25 23.4092 24.25 21.995 24.25 19.1666V10.8333C24.25 8.94763 24.25 8.00482 23.6642 7.41904C23.0784 6.83325 22.1356 6.83325 20.25 6.83325H11.75C9.86438 6.83325 8.92157 6.83325 8.33579 7.41904ZM12.3333 12.2499C11.7811 12.2499 11.3333 12.6976 11.3333 13.2499C11.3333 13.8022 11.7811 14.2499 12.3333 14.2499H19.6667C20.219 14.2499 20.6667 13.8022 20.6667 13.2499C20.6667 12.6976 20.219 12.2499 19.6667 12.2499H12.3333ZM12.3333 17.9166H19.6667C20.219 17.9166 20.6667 17.4689 20.6667 16.9166C20.6667 16.3643 20.219 15.9166 19.6667 15.9166H12.3333C11.7811 15.9166 11.3333 16.3643 11.3333 16.9166C11.3333 17.4689 11.7811 17.9166 12.3333 17.9166Z" fill="white"/>
      </SvgIcon>
    )
  } 

  export const NonActiveRequest = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <path d="M8.66666 11.75C8.66666 9.86438 8.66666 8.92157 9.25244 8.33579C9.83823 7.75 10.781 7.75 12.6667 7.75H19.3333C21.2189 7.75 22.1617 7.75 22.7475 8.33579C23.3333 8.92157 23.3333 9.86438 23.3333 11.75V18.25C23.3333 21.0784 23.3333 22.4926 22.4546 23.3713C21.576 24.25 20.1617 24.25 17.3333 24.25H14.6667C11.8382 24.25 10.424 24.25 9.54534 23.3713C8.66666 22.4926 8.66666 21.0784 8.66666 18.25V11.75Z" stroke="#5C5C5C" stroke-width="2" fill="white"/>
        <path d="M18.75 21.5L18.75 24.25M13.25 21.5L13.25 24.25" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" fill="white"/>
        <path d="M13.25 12.3333L18.75 12.3333" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" fill="white"/>
        <path d="M13.25 16L18.75 16" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" fill="white"/>
      </SvgIcon>
    )
  } 

  export const ActiveInquiline = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#159D74"/>
        <path d="M19.7047 23.7239C20.2359 23.6132 20.5522 23.0574 20.2883 22.5834C19.7064 21.5383 18.7897 20.62 17.6171 19.9201C16.1069 19.0188 14.2565 18.5303 12.3528 18.5303C10.4492 18.5303 8.59882 19.0188 7.08858 19.9201C5.91595 20.62 4.99929 21.5383 4.41742 22.5834C4.15349 23.0574 4.46983 23.6132 5.00099 23.7239C9.85013 24.7345 14.8556 24.7345 19.7047 23.7239Z" fill="white"/>
        <circle cx="12.3528" cy="11.8042" r="4.80416" fill="white"/>
        <ellipse cx="21.4808" cy="13.0855" rx="3.8033" ry="3.8033" fill="white"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.9179 23.2134C22.996 23.0177 22.9926 22.7926 22.8761 22.5834C22.2942 21.5383 21.3776 20.62 20.2049 19.9201C19.6737 19.6031 19.1004 19.3371 18.4974 19.1255C19.4644 18.7365 20.5423 18.5303 21.6427 18.5303C23.1497 18.5303 24.6146 18.917 25.8102 19.6306C26.7386 20.1846 27.4643 20.9116 27.9249 21.739C28.1338 22.1143 27.8834 22.5543 27.4629 22.6419C25.9619 22.9547 24.442 23.1453 22.9179 23.2134Z" fill="white"/>
      </SvgIcon>
    )
  } 

  export const NonActiveInquiline = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <path d="M19.7274 23.4471C19.2716 22.1713 18.2672 21.0439 16.8701 20.2399C15.4729 19.4358 13.7611 19 12 19C10.2389 19 8.52706 19.4358 7.12991 20.2399C5.73276 21.0439 4.72839 22.1713 4.27259 23.4471" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" fill="white"/>
        <circle cx="12" cy="11" r="4" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" fill="white"/>
        <path d="M27.6175 22.1871C27.2567 21.1771 26.4616 20.2846 25.3555 19.6481C24.2494 19.0115 22.8942 18.6665 21.5 18.6665C20.6968 18.6665 19.9065 18.781 19.1693 18.9998" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" fill="white"/>
        <ellipse cx="21.5" cy="12.3332" rx="3.16667" ry="3.16667" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" fill="white"/>
      </SvgIcon>
    )
  } 

  export const ActiveGastos = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#159D74"/>
        <path d="M24 9C24.5523 9 25 8.55228 25 8C25 7.44772 24.5523 7 24 7V9ZM9.50001 9L24 9V7L9.50001 7L9.50001 9ZM9.50001 14H17.5V12H9.50001V14ZM8.00001 10.5C8.00001 9.67157 8.67158 9 9.50001 9L9.50001 7C7.56701 7 6.00001 8.567 6.00001 10.5H8.00001ZM6.00001 10.5C6.00001 12.433 7.56701 14 9.50001 14V12C8.67158 12 8.00001 11.3284 8.00001 10.5H6.00001Z" fill="white"/>
        <path d="M8 16V10.5H6L6 16H8Z" fill="white"/>
        <path d="M7 12.5H6.5V13L6.5 23V23.0329C6.49998 23.4762 6.49995 23.8581 6.54107 24.1639C6.58514 24.4917 6.68451 24.8058 6.93934 25.0607L6.93934 25.0607C7.19417 25.3155 7.50835 25.4149 7.83611 25.4589C8.14193 25.5 8.52384 25.5 8.96708 25.5L9 25.5L23 25.5C23.011 25.5 23.022 25.5 23.0329 25.5C23.4762 25.5 23.8581 25.5 24.1639 25.4589C24.4917 25.4149 24.8058 25.3155 25.0607 25.0607C25.3155 24.8058 25.4149 24.4917 25.4589 24.1639C25.5 23.8581 25.5 23.4762 25.5 23.0329C25.5 23.022 25.5 23.011 25.5 23V22V21.5H25H22C20.6193 21.5 19.5 20.3807 19.5 19C19.5 17.6193 20.6193 16.5 22 16.5H25H25.5V16V15L25.5 14.9671C25.5 14.5238 25.5 14.1419 25.4589 13.8361C25.4149 13.5083 25.3155 13.1942 25.0607 12.9393C24.8058 12.6845 24.4917 12.5851 24.1639 12.5411C23.8581 12.5 23.4762 12.5 23.0329 12.5L23 12.5L7 12.5Z" fill="white" stroke="white"/>
      </SvgIcon>
    )
  } 

  export const NonActiveGastos = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <path d="M25 17H26H25ZM23.8317 10.9908L22.8878 10.6606L23.8317 10.9908ZM21.9908 12.8316L21.6606 11.8878L21.9908 12.8316ZM19.2929 20.7071L18.5858 21.4142L19.2929 20.7071ZM19.2929 17.2929L18.5858 16.5858L19.2929 17.2929ZM24.7071 13.2929L25.4142 12.5858L24.7071 13.2929ZM23 25V26V25ZM24.7071 24.7071L24 24L24.7071 24.7071ZM11 25V26V25ZM7.58579 24.4142L6.87869 25.1213L7.58579 24.4142ZM23.6651 8.02806L23.9954 7.08418L23.6651 8.02806ZM23.9719 8.33486L24.9158 8.00458L23.9719 8.33486ZM9.50001 9L23.2857 9V7L9.50001 7L9.50001 9ZM11 26L23 26V24L11 24V26ZM6.00001 10.5L6.00001 21H8.00001L8.00001 10.5H6.00001ZM23 12L9.50001 12V14L23 14L23 12ZM24 21V23H26L26 21H24ZM24 15L24 17H26L26 15H24ZM21 22H25V20H21V22ZM24 17L24 21H26L26 17H24ZM25 16H21V18H25V16ZM19.7143 12L19 12V14L19.7143 14V12ZM23 8.71428C23 9.99493 22.9859 10.3802 22.8878 10.6606L24.7755 11.3211C25.0141 10.6392 25 9.82755 25 8.71428H23ZM19.7143 14C20.8276 14 21.6392 14.0141 22.3211 13.7755L21.6606 11.8878C21.3802 11.9859 20.9949 12 19.7143 12V14ZM22.8878 10.6606C22.6867 11.2351 22.2351 11.6867 21.6606 11.8878L22.3211 13.7755C23.4701 13.3735 24.3735 12.4701 24.7755 11.3211L22.8878 10.6606ZM18 19C18 19.4431 17.9979 19.8761 18.0455 20.2305C18.097 20.6137 18.2226 21.051 18.5858 21.4142L20 20C20.0703 20.0703 20.0494 20.1254 20.0277 19.964C20.0021 19.7738 20 19.4997 20 19H18ZM21 20C20.5003 20 20.2262 19.9979 20.036 19.9723C19.8746 19.9506 19.9297 19.9297 20 20L18.5858 21.4142C18.949 21.7774 19.3863 21.903 19.7695 21.9545C20.1239 22.0021 20.5569 22 21 22V20ZM20 19C20 18.5003 20.0021 18.2262 20.0277 18.036C20.0494 17.8746 20.0703 17.9297 20 18L18.5858 16.5858C18.2226 16.949 18.097 17.3863 18.0455 17.7695C17.9979 18.1239 18 18.5569 18 19H20ZM21 16C20.5569 16 20.1239 15.9979 19.7695 16.0455C19.3863 16.097 18.949 16.2226 18.5858 16.5858L20 18C19.9297 18.0703 19.8746 18.0494 20.036 18.0277C20.2262 18.0021 20.5003 18 21 18V16ZM23 14C23.4997 14 23.7738 14.0021 23.964 14.0277C24.1254 14.0494 24.0703 14.0703 24 14L25.4142 12.5858C25.051 12.2226 24.6137 12.097 24.2305 12.0455C23.8761 11.9979 23.4431 12 23 12L23 14ZM26 15C26 14.5569 26.0021 14.1239 25.9545 13.7695C25.903 13.3863 25.7774 12.949 25.4142 12.5858L24 14C23.9297 13.9297 23.9506 13.8746 23.9723 14.036C23.9979 14.2262 24 14.5003 24 15H26ZM23 26C23.4431 26 23.8761 26.0021 24.2305 25.9545C24.6137 25.903 25.051 25.7774 25.4142 25.4142L24 24C24.0703 23.9297 24.1254 23.9506 23.964 23.9723C23.7738 23.9979 23.4997 24 23 24V26ZM24 23C24 23.4997 23.9979 23.7738 23.9723 23.964C23.9506 24.1254 23.9297 24.0703 24 24L25.4142 25.4142C25.7774 25.051 25.903 24.6137 25.9545 24.2305C26.0021 23.8761 26 23.4431 26 23H24ZM11 24C10.0289 24 9.40122 23.9979 8.93871 23.9357C8.50497 23.8774 8.36902 23.7832 8.2929 23.7071L6.87869 25.1213C7.38835 25.631 8.0167 25.8297 8.67222 25.9179C9.29897 26.0021 10.0855 26 11 26V24ZM6.00001 21C6.00001 21.9145 5.99788 22.701 6.08215 23.3278C6.17028 23.9833 6.36902 24.6117 6.87869 25.1213L8.2929 23.7071C8.21678 23.631 8.12263 23.495 8.06431 23.0613C8.00213 22.5988 8.00001 21.9711 8.00001 21H6.00001ZM6.00001 10.5C6.00001 12.433 7.56701 14 9.50001 14V12C8.67158 12 8.00001 11.3284 8.00001 10.5H6.00001ZM23.2857 9C23.3372 9 23.3747 9.00001 23.4065 9.00037C23.4383 9.00073 23.4543 9.00136 23.4617 9.0018C23.4688 9.00221 23.4578 9.00191 23.4362 8.99831C23.4126 8.99439 23.3771 8.98673 23.3349 8.97194L23.9954 7.08418C23.7144 6.98586 23.4015 7 23.2857 7V9ZM25 8.71428C25 8.59849 25.0141 8.28557 24.9158 8.00458L23.0281 8.66514C23.0133 8.62287 23.0056 8.58742 23.0017 8.56385C22.9981 8.54218 22.9978 8.53118 22.9982 8.53829C22.9986 8.54567 22.9993 8.56166 22.9996 8.59346C23 8.62528 23 8.66277 23 8.71428H25ZM23.3349 8.97194C23.1912 8.92169 23.0783 8.80876 23.0281 8.66514L24.9158 8.00458C24.7651 7.57371 24.4263 7.23494 23.9954 7.08418L23.3349 8.97194ZM8.00001 10.5C8.00001 9.67157 8.67158 9 9.50001 9L9.50001 7C7.56701 7 6.00001 8.567 6.00001 10.5H8.00001Z" fill="#5C5C5C"/>
      </SvgIcon>
    )
  } 

  export const ActiveExpenses = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#159D74"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.87868 7.87868C6 8.75736 6 10.1716 6 13V19C6 21.8284 6 23.2426 6.87868 24.1213C7.75736 25 9.17157 25 12 25H20C22.8284 25 24.2426 25 25.1213 24.1213C26 23.2426 26 21.8284 26 19V13C26 10.1716 26 8.75736 25.1213 7.87868C24.2426 7 22.8284 7 20 7H12C9.17157 7 7.75736 7 6.87868 7.87868ZM20 12C20.5523 12 21 12.4477 21 13V21C21 21.5523 20.5523 22 20 22C19.4477 22 19 21.5523 19 21V13C19 12.4477 19.4477 12 20 12ZM13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4477 11 15V21C11 21.5523 11.4477 22 12 22C12.5523 22 13 21.5523 13 21V15ZM17 17C17 16.4477 16.5523 16 16 16C15.4477 16 15 16.4477 15 17V21C15 21.5523 15.4477 22 16 22C16.5523 22 17 21.5523 17 21V17Z" fill="white"/> 
      </SvgIcon>
    )
  } 

  export const NonActiveExpenses = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <rect x="7" y="8" width="18" height="16" rx="2" stroke="#5C5C5C" stroke-width="2" fill="white"/>
        <path d="M12 14L12 20" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M16 16V20" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20 12V20" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </SvgIcon>
    )
  } 

  export const ActiveDocuments = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#159D74"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 6V11L16 11.0544C15.9999 11.4785 15.9998 11.8906 16.0455 12.2305C16.097 12.6137 16.2226 13.051 16.5858 13.4142C16.949 13.7774 17.3863 13.903 17.7695 13.9545C18.1094 14.0002 18.5215 14.0001 18.9456 14H18.9456H18.9456H18.9456L19 14H24V20C24 22.8284 24 24.2426 23.1213 25.1213C22.2426 26 20.8284 26 18 26H14C11.1716 26 9.75736 26 8.87868 25.1213C8 24.2426 8 22.8284 8 20V12C8 9.17157 8 7.75736 8.87868 6.87868C9.75736 6 11.1716 6 14 6H16ZM18 6.00462V11C18 11.4997 18.0021 11.7738 18.0277 11.964L18.0287 11.9713L18.036 11.9723C18.2262 11.9979 18.5003 12 19 12H23.9954C23.9852 11.5884 23.9525 11.316 23.8478 11.0631C23.6955 10.6955 23.4065 10.4065 22.8284 9.82843L20.1716 7.17157C19.5935 6.59351 19.3045 6.30448 18.9369 6.15224C18.684 6.04749 18.4116 6.01481 18 6.00462ZM12 17C12 16.4477 12.4477 16 13 16L19 16C19.5523 16 20 16.4477 20 17C20 17.5523 19.5523 18 19 18L13 18C12.4477 18 12 17.5523 12 17ZM13 20C12.4477 20 12 20.4477 12 21C12 21.5523 12.4477 22 13 22H17C17.5523 22 18 21.5523 18 21C18 20.4477 17.5523 20 17 20H13Z" fill="white"/>
      </SvgIcon>
    )
  } 

  export const NonActiveDocuments = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <path d="M17.1716 7H13C11.1144 7 10.1716 7 9.58579 7.58579C9 8.17157 9 9.11438 9 11V21C9 22.8856 9 23.8284 9.58579 24.4142C10.1716 25 11.1144 25 13 25H19C20.8856 25 21.8284 25 22.4142 24.4142C23 23.8284 23 22.8856 23 21V12.8284C23 12.4197 23 12.2153 22.9239 12.0315C22.8478 11.8478 22.7032 11.7032 22.4142 11.4142L18.5858 7.58579C18.2968 7.29676 18.1522 7.15224 17.9685 7.07612C17.7847 7 17.5803 7 17.1716 7Z" stroke="#5C5C5C" stroke-width="2" fill="white"/>
        <path d="M13 17L19 17" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round"/>
        <path d="M13 21L17 21" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round"/>
        <path d="M17 7V11C17 11.9428 17 12.4142 17.2929 12.7071C17.5858 13 18.0572 13 19 13H23" stroke="#5C5C5C" stroke-width="2" fill="white"/>
      </SvgIcon>
    )
  } 


  export const ActiveChat = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="16" fill="#159D74"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 7C11.0294 7 7 11.0294 7 16C7 20.9706 11.0294 25 16 25H20.5C21.8978 25 22.5967 25 23.1481 24.7716C23.8831 24.4672 24.4672 23.8831 24.7716 23.1481C25 22.5967 25 21.8978 25 20.5V16C25 11.0294 20.9706 7 16 7ZM12 15C12 14.4477 12.4477 14 13 14H19C19.5523 14 20 14.4477 20 15C20 15.5523 19.5523 16 19 16H13C12.4477 16 12 15.5523 12 15ZM15 19C15 18.4477 15.4477 18 16 18H19C19.5523 18 20 18.4477 20 19C20 19.5523 19.5523 20 19 20H16C15.4477 20 15 19.5523 15 19Z" fill="white"/> 
      </SvgIcon>
    )
  } 

  export const NonActiveChat = (props) => {
    return (
      <SvgIcon {...props} viewBox="0 0 32 32">
        <path d="M8 16C8 11.5817 11.5817 8 16 8V8C20.4183 8 24 11.5817 24 16V21.0909C24 21.9375 24 22.3608 23.8739 22.6989C23.6712 23.2425 23.2425 23.6712 22.6989 23.8739C22.3608 24 21.9375 24 21.0909 24H16C11.5817 24 8 20.4183 8 16V16Z" stroke="#5C5C5C" stroke-width="2" fill="white" />
        <path d="M13 15L19 15" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 19H19" stroke="#5C5C5C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </SvgIcon>
    )
  } 

  

  


  