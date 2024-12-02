import axios from "axios";
const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
const API_URI = import.meta.env.VITE_API_URI;
const userId = JSON.parse(localStorage.getItem("user"))?.userId;
import { USER_EDITOR_DOC_TEMPLATE } from "../components/Editor/editorUtils";
export const ROLES = {
  USER: "user",
  MODEL: "model",
};
export const TYPE_TEXT_COLOR = {
  response: "amber",
  prompt: "sky",
  summary: "grass",
  writer: "pink",
  rewriter: "violet",
};
export const TYPES = {
  RESPONSE: "response",
  PROMPT: "prompt",
  SUMMARY: "summary",
  WRITER: "writer",
  REWRITER: "rewriter",
};
export const SUB_TYPES = {
  ASK_AI: "askAI",
  SUMMARY_LIST: "key-points",
  SUMMARY_TLDR: "tl;dr",
  SUMMARY_TEASER: "teaser",
  SUMMARY_HEADLINE: "headline",
  COMPLETE_IT: "complete",
  ELABORATE: "elaborate",
  SIMPLIFY: "simplify",
  BRIEF: "brief",
  FORMALIZE: "more-formal",
  CASUAL: "more-casual",
  EXTRACT_KEYWORDS: "keywords",
};
export const SYSTEM_PROMPTS = {
  BRIEF: `**Prompt:**

**Task:** Provide a brief summary of the given text.

**Example 1:**

**Text:** Artificial intelligence (AI) is intelligence demonstrated by machines, unlike the natural intelligence displayed by humans.  
 Leading AI textbooks define 
 artificial intelligence as the study of "intelligent agents": any device that perceives its environment and takes actions that maximize its chance of successfully achieving its goals. 

**Brief:** AI is machine intelligence that perceives and acts to achieve goals.

**Example 2:**

**Text:** Climate change, also called global warming, is a long-term shift in global or regional climate patterns. Typically, climate change refers to the increase in global average temperature. It is caused by increased concentrations of greenhouse gases in the atmosphere, mainly from human activities such as burning fossil fuels. 

**Brief:** Climate change is a long-term warming trend caused by human activities. `,
  COMPLETE_IT: `**Prompt:**

**Task:** Complete the given sentence.

**Example 1:**

**Sentence Start:** "The quick brown fox" 
**Completion:** "The quick brown fox jumps over the lazy dog."

**Example 2:**

**Sentence Start:** "Early to bed, early to rise" 
**Completion:** "Early to bed, early to rise, makes a man healthy, wealthy, and wise."

**Example 3:** 

**Sentence Start:** "A stitch in time" 
**Completion:** "A stitch in time saves nine."
If a sentence is already completed say it is already completed `,
  SIMPLIFY: `**Prompt:**

**Task:** Simplify the given text.

**Example 1:**

**Complex Text:** The proliferation of digital technology has significantly impacted the way we communicate, work, and learn.
**Simplified Text:** Digital technology has changed how we communicate, work, and learn.

**Example 2:**

**Complex Text:** The ubiquitous nature of smartphones has revolutionized the way we access information and connect with others.
**Simplified Text:** Smartphones have changed how we get information and connect with people.

**Example 3:** 

**Complex Text:** The advent of artificial intelligence has the potential to disrupt numerous industries and reshape society.
**Simplified Text:** AI can change many industries and society.`,
  ELABORATE: `**Prompt:**

**Task:** Elaborate on the given text while maintaining the original tone and style.

**Example 1:**

**Text:** "The quick brown fox jumps over the lazy dog."
**Elaboration:** The agile, swift fox, colored in shades of brown, leaped gracefully over the indolent canine. 

**Example 2:**

**Text:** "The early bird catches the worm."
**Elaboration:** Those who rise before the sun are more likely to capitalize on opportunities and achieve their goals. 

**Example 3:**

**Text:** "It's raining cats and dogs."
**Elaboration:** The precipitation is extraordinarily heavy, as if a deluge of animals were falling from the heavens.`,
  EXTRACT_KEYWORDS: `**Prompt:**

**Task:** Extract keywords from the given text.

**Example 1:**

**Text:** Artificial intelligence is intelligence demonstrated by machines, unlike the natural intelligence displayed by humans. Leading AI textbooks define 
 artificial intelligence as the study of "intelligent agents": any device that perceives its environment and takes actions that maximize its chance of successfully achieving its goals. 

**Keywords:** artificial intelligence, machine intelligence, intelligent agents

**Example 2:**

**Text:** Climate change, also called global warming, is a long-term shift in global or regional climate patterns. Typically, climate change refers to the increase in global average temperature. It is caused by increased concentrations of greenhouse gases in the atmosphere, mainly from human activities such as burning fossil fuels. 

**Keywords:** climate change, global warming, greenhouse gases, human activities

Provide a list of commas separated keyword `,
  PROMPT:
    "You are a helpful and enthusiastic support bot who can answer a given questions. If you really don't know the answer say sorry. Don't try to make up an answer. always speaking as you were chatting to a friend",
};
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
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;
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
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;
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
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;
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
export async function getUserEditorDoc({ userEditorDocId }) {
  try {
    const res = await axios.post(
      `${BACKEND_URI}/${API_URI}/editorDocs/getDoc`,
      {
        userEditorDocId,
      }
    );
    return {
      error: res?.data?.error,
      userEditorDoc: res?.data?.userEditorDoc?.userEditorDocData || [],
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

export async function updateUserEditorDoc({ userEditorDocId, data }) {
  try {
    const res = await axios.post(
      `${BACKEND_URI}/${API_URI}/editorDocs/updateDoc`,
      {
        data,
        userEditorDocId,
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
