import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {baseUrl} from "../constants";
import {IQuestionAndAnswer} from "../types";

export const questionAPI = createApi({
    reducerPath: 'questionAPI',
    baseQuery: fetchBaseQuery({baseUrl}),
    endpoints: (build) => ({
        fetchQuestion: build.query<IQuestionAndAnswer[], ''>({
            query: () => ({
                url: '/questions',
            }),
            transformResponse: (response: any): IQuestionAndAnswer[] => {
                return response.data.map((question: any): IQuestionAndAnswer => ({
                    id: question.id,
                    question: question.attributes.question,
                    answer: question.attributes.answer,
                }))
            }
        })
    })
});

export const {useFetchQuestionQuery} = questionAPI