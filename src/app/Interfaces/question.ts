import { Option } from "./option";

export interface Question {
    id: number;
    text: string;
    options: Option[]
}
