import { FC, memo } from "react";
import { twMerge } from "tailwind-merge";

const StarIcon: FC<IconProps> = memo(({ className }) => (
  <svg
    className={twMerge("h-6 w-6 stroke-2", className)}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_2612_10159)">
      <path
        d="M5.74984 20.3334V16.1667M5.74984 7.83335V3.66669M3.6665 5.75002H7.83317M3.6665 18.25H7.83317M12.8332 4.50002L11.388 8.25741C11.153 8.86843 11.0355 9.17394 10.8528 9.43093C10.6908 9.65869 10.4918 9.85768 10.2641 10.0196C10.0071 10.2024 9.70158 10.3199 9.09055 10.5549L5.33317 12L9.09056 13.4452C9.70158 13.6802 10.0071 13.7977 10.2641 13.9804C10.4918 14.1424 10.6908 14.3414 10.8528 14.5691C11.0355 14.8261 11.153 15.1316 11.388 15.7426L12.8332 19.5L14.2783 15.7426C14.5133 15.1316 14.6308 14.8261 14.8136 14.5691C14.9755 14.3414 15.1745 14.1424 15.4023 13.9804C15.6592 13.7977 15.9648 13.6802 16.5758 13.4452L20.3332 12L16.5758 10.5549C15.9648 10.3199 15.6592 10.2024 15.4023 10.0196C15.1745 9.85768 14.9755 9.65869 14.8136 9.43093C14.6308 9.17394 14.5133 8.86843 14.2783 8.2574L12.8332 4.50002Z"
        stroke="#667085"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_2612_10159">
        <rect width="20" height="20" fill="white" transform="translate(2 2)" />
      </clipPath>
    </defs>
  </svg>
));

StarIcon.displayName = "StarIcon";
export { StarIcon };
