import { createAction, handleActions } from 'redux-actions';
import { pender } from 'redux-pender';

import axios from 'axios';

function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
}

const GET_POST = 'GET_POST';

export const getPost = createAction(GET_POST, getPostAPI);

const initialState = {
    //요청이 진행중인지, 에러가 났는지의 여부는 penderReducer가 담당
    data: {
        title: '',
        body: ''
    }
}

export default handleActions({
    ...pender({
        type: GET_POST, //type이 주어지면, 이 type에 접미사를 붙인 액션핸들러들이 담긴 객체를 생성.

        //요청중일때 onPending: (state, action) => state
        //실패했을때 onFailure: (state, action) => state

        //성공했을 때
        onSuccess: (state, action) => {
            const { title, body } = action.payload.data;
            return {
                data: {
                    title,
                    body
                }
            }
        }
        //함수가 생략됬을 때 기본 값으로 state를 그대로 반환.
    })
}, initialState);