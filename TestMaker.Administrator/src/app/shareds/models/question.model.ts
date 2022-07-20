export enum QUESTION_TYPE {
    MultipleChoiceQuestion = 1,
    BlankFillingQuestion = 2,
    SortingQuestion = 3,
    MatchingQuestion = 4
}

export const QUESTION_TYPES: {
    title: string;
    value: QUESTION_TYPE;
}[] = [{
    title: 'Chọn đáp án',
    value: QUESTION_TYPE.MultipleChoiceQuestion
}, {
    title: 'Điền chỗ trống',
    value: QUESTION_TYPE.BlankFillingQuestion
}, {
    title: 'Sắp xếp',
    value: QUESTION_TYPE.SortingQuestion
}, {
    title: 'Nối',
    value: QUESTION_TYPE.MatchingQuestion
}];

export interface IQuestion extends IQuestionBase {
    contentAsJson: string;
}

export interface IQuestionBase {
    type: QUESTION_TYPE;
    media?: FileList;
    sectionId: string;
}

export interface IQuestionForDetails extends IQuestion {
    questionId: string;
}

// tslint:disable-next-line: no-empty-interface
export interface IQuestionForCreating extends IQuestion {
}

export interface IQuestionForEditing extends IQuestion {
    questionId: string;
}


export interface IQuestionHelper {
    getQuestionForCreating: () => IQuestionForCreating;
    getQuestionForEditing: () => IQuestionForEditing;
    changeForm: (question?: IQuestionForDetails) => void;
}
