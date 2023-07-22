import {
  CheckCircle,
  DotPointsIcon,
  PencilLineIcon,
  PenToolIcon,
  PenToolMinusIcon,
  PenToolPlusIcon,
  StarIcon,
} from "@/icons";
import { Section } from "@/models";

export const getAiHelpOptions = (section: Section) => [
  {
    icon: DotPointsIcon,
    label: "Summarize",
    action: () => {},
  },
  {
    icon: PencilLineIcon,
    label: "Continue Writing",
    action: () => {},
  },
  {
    icon: PenToolMinusIcon,
    label: "Make Shorter",
    action: () => {},
  },
  {
    icon: PenToolPlusIcon,
    label: "Make Longer",
    action: () => {},
  },
  {
    icon: PenToolIcon,
    label: "Simplify Language",
    action: () => {},
  },
  {
    icon: CheckCircle,
    label: "Fix spelling and grammar",
    action: () => {},
  },
  {
    icon: StarIcon,
    label: "Let AI guide writing the portfolio",
    action: () => {},
  },
];
