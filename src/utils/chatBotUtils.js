const { available } = await ai.languageModel.capabilities();
const canSummarize = await ai.summarizer.capabilities();

let modelAvailability = {
  prompt: false,
  summarizer: false,
  rewriter: false,
};
if (available !== "no") {
  modelAvailability.prompt = true;
}
if (canSummarize && canSummarize.available !== "no") {
  if (canSummarize.available === "readily") {
    modelAvailability.summarizer = true;
  }
}
import { SUB_TYPES, SYSTEM_PROMPTS, TYPES } from ".";
SUB_TYPES.ASK_AI, SUB_TYPES.BRIEF, SUB_TYPES.EXTRACT_KEYWORDS;

export async function getResponseFromChatBot({ type, subType, text }) {
  if (type === TYPES.PROMPT && modelAvailability.prompt) {
    if (subType === SUB_TYPES.ASK_AI) {
      return await getPromptResponse(SYSTEM_PROMPTS.PROMPT, text);
    } else if (subType === SUB_TYPES.COMPLETE_IT) {
      return await getPromptResponse(SYSTEM_PROMPTS.COMPLETE_IT, text);
    } else if (subType === SUB_TYPES.SIMPLIFY) {
      return await getPromptResponse(SYSTEM_PROMPTS.SIMPLIFY, text);
    } else if (subType === SUB_TYPES.BRIEF) {
      return await getPromptResponse(SYSTEM_PROMPTS.BRIEF, text);
    } else if (subType === SUB_TYPES.EXTRACT_KEYWORDS) {
      return await getPromptResponse(SYSTEM_PROMPTS.EXTRACT_KEYWORDS, text);
    }
  } else if (type === TYPES.SUMMARY && modelAvailability.summarizer) {
    if (subType === SUB_TYPES.SUMMARY_LIST) {
      return await getSummarizerResponse(SUB_TYPES.SUMMARY_LIST, text);
    } else if (subType === SUB_TYPES.SUMMARY_TLDR) {
      return await getSummarizerResponse(SUB_TYPES.SUMMARY_TLDR, text);
    } else if (subType === SUB_TYPES.SUMMARY_TEASER) {
      return await getSummarizerResponse(SUB_TYPES.SUMMARY_TEASER, text);
    } else if (subType === SUB_TYPES.SUMMARY_HEADLINE) {
      return await getSummarizerResponse(SUB_TYPES.SUMMARY_HEADLINE, text);
    }
  } else if (type === TYPES.REWRITER) {
    if (subType === SUB_TYPES.FORMALIZE) {
      return await getRewriteResponse(SUB_TYPES.FORMALIZE, text);
    } else if (subType === SUB_TYPES.CASUAL) {
      return await getRewriteResponse(SUB_TYPES.CASUAL, text);
    }
  } else {
    return {
      error: true,
      errorMsg: "No matching type or subtype",
    };
  }
}

const getPromptResponse = async (prompt, text) => {
  try {
    const session = await ai.languageModel.create({ systemPrompt: prompt });
    const res = await session.prompt(text);
    console.log(res);
    session.destroy();
    return res;
  } catch (error) {
    return {
      error: true,
      errorMsg: "Chatbot not working",
    };
  }
};
const getSummarizerResponse = async (summarizeFormat, text) => {
  try {
    const session = await ai.summarizer.create({
      type: summarizeFormat,
      format: "markdown",
    });
    console.log({ text });
    const res = await session.summarize(text);
    session.destroy();
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      errorMsg: "Chatbot not working",
    };
  }
};
const getRewriteResponse = async (rewriteTone, text) => {
  try {
    const rewriter = await self.ai.rewriter.create({
      tone: rewriteTone,
      length: "as-is",
      format: "markdown",
    });
    console.log({ text, rewriter });
    const res = await rewriter.rewrite(text);
    console.log(res);
    rewriter.destroy();
    return res;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      errorMsg: "Chatbot not working",
    };
  }
};
