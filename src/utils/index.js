import axios from "axios";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
const API_URI = import.meta.env.VITE_API_URI;
import { USER_EDITOR_DOC_TEMPLATE } from "../components/Editor/editorUtils";

export async function createUser({ name, email }) {
  try {
    const res = await axios.post(`${BACKEND_URI}/${API_URI}/user/createUser`, {
      name,
      email,
    });
    const user = res?.data?.user;
    localStorage.setItem("user", JSON.stringify(user));
    return res?.data?.error;
  } catch (error) {
    return (
      error?.response?.data?.error || {
        error: true,
        errMsg: "Something went wrong",
      }
    );
  }
}

export async function getUser({ email }) {
  try {
    const res = await axios.post(`${BACKEND_URI}/${API_URI}/user/getUser`, {
      email,
    });
    const user = res?.data?.user;
    localStorage.setItem("user", JSON.stringify(user));
    return res?.data?.error;
  } catch (error) {
    console.error(error);
    return (
      error?.response?.data?.error || {
        error: true,
        errMsg: "Something went wrong",
      }
    );
  }
}

export async function addSubject({ subjectName }) {
  const userId = "67444ef116991743ad17eb45";
  try {
    const res = await axios.post(`${BACKEND_URI}/${API_URI}/list/addSubject`, {
      userId,
      subjectName,
    });
    return res?.data?.error;
  } catch (error) {
    console.error(error);
    return (
      error?.response?.data?.error || {
        error: true,
        errMsg: "Something went wrong",
      }
    );
  }
}
export async function getSubjects() {
  const userId = "67444ef116991743ad17eb45";
  try {
    const res = await axios.post(`${BACKEND_URI}/${API_URI}/list/getSubjects`, {
      userId,
    });
    return {
      error: res?.data?.error,
      subjectList: res?.data?.subjectList || [],
    };
  } catch (error) {
    return (
      error?.response?.data?.error || {
        error: true,
        errMsg: "Something went wrong",
      }
    );
  }
}
export async function addChapter({ subjectId, chapterName }) {
  try {
    const res = await axios.post(`${BACKEND_URI}/${API_URI}/list/addChapter`, {
      subjectId,
      chapterName,
    });
    return {
      error: res?.data?.error,
      chapterList: res?.data?.chapterList || [],
    };
  } catch (error) {
    console.error(error);
    return (
      error?.response?.data?.error || {
        error: true,
        errMsg: "Something went wrong",
      }
    );
  }
}

export async function getChapters({ subjectId }) {
  try {
    const res = await axios.post(`${BACKEND_URI}/${API_URI}/list/getChapters`, {
      subjectId,
    });
    return {
      error: res?.data?.error,
      chapterList: res?.data?.chapterList || [],
    };
  } catch (error) {
    console.error(error);
    return (
      error?.response?.data?.error || {
        error: true,
        errMsg: "Something went wrong",
      }
    );
  }
}
export async function addTopic({ chapterId, topicName, userEditorDocId }) {
  try {
    const res = await axios.post(`${BACKEND_URI}/${API_URI}/list/addtopic`, {
      chapterId,
      topicName,
      userEditorDocId,
    });
    return {
      error: res?.data?.error,
      topicList: res?.data?.topicList || [],
    };
  } catch (error) {
    console.error(error);
    return (
      error?.response?.data?.error || {
        error: true,
        errMsg: "Something went wrong",
      }
    );
  }
}
export async function getTopics({ chapterId }) {
  try {
    const res = await axios.post(`${BACKEND_URI}/${API_URI}/list/getTopics`, {
      chapterId,
    });
    console.log(res);
    return {
      error: res?.data?.error,
      topicList: res?.data?.topicList || [],
    };
  } catch (error) {
    console.error(error);
    return (
      error?.response?.data?.error || {
        error: true,
        errMsg: "Something went wrong",
      }
    );
  }
}

export async function addUserEditorDoc() {
  const userId = "67444ef116991743ad17eb45";
  try {
    const res = await axios.post(
      `${BACKEND_URI}/${API_URI}/editorDocs/addDoc`,
      {
        userId,
        data: USER_EDITOR_DOC_TEMPLATE,
      }
    );
    return {
      error: res?.data?.error,
      userEditorDoc: res?.data?.userEditorDoc || [],
    };
  } catch (error) {
    console.error(error);
    return (
      error?.response?.data?.error || {
        error: true,
        errMsg: "Something went wrong",
      }
    );
  }
}
