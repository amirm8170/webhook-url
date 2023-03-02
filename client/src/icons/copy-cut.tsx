import { pallet } from "../layout/pallet";

interface propsType {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}
const CopyCut: React.FC<propsType> = ({
  color = pallet.white,
  ...props
}) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props} style={{cursor:'pointer'}}>
    <path fill="none" d="M24 24H0V0h24z" />
    <g
      strokeLinecap="round"
      strokeWidth={1.5}
      fillRule="evenodd"
      stroke={color}
      fill="none"
      strokeLinejoin="round"
    >
      <path d="M16 21h0a2 2 0 0 0 2-2v-2M3 19h0a2 2 0 0 0 2 2M7 6H5h0a2 2 0 0 0-2 2s0 0 0 0" />
    </g>
    <path
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 12v3"
    />
    <g
      strokeLinecap="round"
      strokeWidth={1.5}
      stroke={color}
      fill="none"
      strokeLinejoin="round"
    >
      <path d="M9 21h3M10.11 13.11h7.78M10.11 10h7.78M10.11 6.89h7.78M7 15V5h0a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9h0a2 2 0 0 1-2-2s0 0 0 0Z" />
    </g>
  </svg>
);

export default CopyCut;
