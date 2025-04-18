import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SeletorCor(props:SvgProps) {
  return (
    <Svg
      width={32}
      height={32}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M22 16.5v3a2.5 2.5 0 01-2.5 2.5h-7.14c-.89 0-1.33-1.07-.71-1.7l5.87-6c.19-.19.45-.3.71-.3h1.27a2.5 2.5 0 012.5 2.5zm-3.63-5.21L15.66 14l-2.46 2.45c-.63.63-1.71.19-1.71-.7V7.26c0-.27.11-.52.29-.71l.92-.92c.98-.98 2.56-.98 3.54 0l2.12 2.12c.99.98.99 2.56.01 3.54zM7.5 2h-3C3 2 2 3 2 4.5V18c0 .27.03.54.08.8.03.13.06.26.1.39.05.15.1.3.16.44.01.01.01.02.01.02.01 0 .01 0 0 .01.14.28.3.55.49.8.11.13.22.25.33.37.11.12.23.22.36.32l.01.01c.25.19.52.35.8.49.01-.01.01-.01.01 0 .15.07.3.12.46.17.13.04.26.07.39.1.26.05.53.08.8.08.41 0 .83-.06 1.22-.19.11-.04.22-.08.33-.13.35-.14.69-.34.99-.6.09-.07.19-.16.28-.25l.04-.04C9.56 20.07 10 19.08 10 18V4.5C10 3 9 2 7.5 2zM6 19.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"
        fill="#fff"
      />
    </Svg>
  )
}

export default SeletorCor
