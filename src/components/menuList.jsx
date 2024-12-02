import {
  ArrowRightIcon,
  CaretDownIcon,
  CaretUpIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import {
  Box,
  Button,
  Card,
  Dialog,
  Flex,
  IconButton,
  ScrollArea,
  Separator,
  Spinner,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useEffect, useState } from "react";
import {
  addChapter,
  addTopic,
  addUserEditorDoc,
  getChapters,
  getSubjects,
  getTopics,
} from "../utils";
import { useNavigate } from "react-router-dom";

export default function MenuList() {
  const defaultSubjectObj = {
    subjectList: [],
    loading: true,
    error: false,
    whichSubjectSelected: null,
  };
  const [subjectListObj, setSubjectListObj] = useState(defaultSubjectObj);
  const getSubjectList = async () => {
    const res = await getSubjects();
    if (res.error === true) {
      setSubjectListObj({ ...subjectListObj, error: true, loading: false });
    } else {
      setSubjectListObj({
        ...subjectListObj,
        subjectList: res?.subjectList?.subjectList || [],
        loading: false,
      });
    }
  };
  useEffect(() => {
    getSubjectList();
  }, []);
  return (
    <ScrollArea
      type="auto"
      style={{ height: "100%", maxWidth: "100%" }}
      scrollbars="vertical"
    >
      <Box mt={"3"} pr={"2"}>
        <Flex align={"center"} justify={"between"}>
          <Text size={"1"} color="gray">
            Subjects
          </Text>
        </Flex>
        <Flex gap={"2"} direction={"column"} mt={"2"}>
          {subjectListObj.loading ? (
            <Spinner className="mx-auto" />
          ) : subjectListObj?.error ? (
            <Text size={"1"} align={"center"} color="red">
              Something went wrong
            </Text>
          ) : subjectListObj?.subjectList?.length === 0 ? (
            <Text size={"1"} align={"center"} color="gray">
              Subjects not found
            </Text>
          ) : (
            subjectListObj?.subjectList.map((item, index) => {
              const { subjectName, subjectId } = item;
              return (
                <Box key={subjectId}>
                  <Card
                    className={`${
                      subjectListObj?.whichSubjectSelected === index
                        ? "text-800 bg-[#9ceaff]"
                        : "text-300"
                    } select-none px-2 py-2`}
                    onClick={() => {
                      if (subjectListObj.whichSubjectSelected === index) {
                        setSubjectListObj({
                          ...subjectListObj,
                          whichSubjectSelected: null,
                        });
                      } else {
                        setSubjectListObj({
                          ...subjectListObj,
                          whichSubjectSelected: index,
                        });
                      }
                    }}
                  >
                    <Flex align={"center"} justify={"between"}>
                      <Text size={"1"}>{subjectName}</Text>
                      <IconButton
                        variant="ghost"
                        className={`${
                          subjectListObj.whichSubjectSelected === index
                            ? "text-800"
                            : "text-300"
                        }`}
                      >
                        {subjectListObj.whichSubjectSelected === index ? (
                          <CaretUpIcon />
                        ) : (
                          <CaretDownIcon />
                        )}
                      </IconButton>
                    </Flex>
                  </Card>
                  <Box ml={"2"}>
                    {subjectListObj.whichSubjectSelected === index ? (
                      <ChapterList subjectId={subjectId} />
                    ) : null}
                  </Box>
                </Box>
              );
            })
          )}
        </Flex>
      </Box>
    </ScrollArea>
  );
}

function ChapterList({ subjectId }) {
  const defaultChapterListObj = {
    chapterList: [],
    loading: true,
    error: false,
    whichChapterSelected: null,
  };
  const [chapterListObj, setChapterListObj] = useState(defaultChapterListObj);
  const getChapterList = async () => {
    const res = await getChapters({ subjectId });
    if (res.error === true) {
      setChapterListObj({ ...chapterListObj, error: true, loading: false });
    } else {
      setChapterListObj({
        ...chapterListObj,
        chapterList: res?.chapterList?.chapterList || [],
        loading: false,
      });
    }
  };
  const defaultChapterObj = {
    chapterName: "",
    openAddChapterDialog: false,
    error: false,
    loading: false,
  };
  const handleCreateChapter = async () => {
    setChapterObj((prevChapterObj) => ({
      ...prevChapterObj,
      loading: true,
    }));
    const res = await addChapter({
      subjectId,
      chapterName: chapterObj.chapterName,
    });
    if (res.error === true) {
      setChapterObj({ ...chapterObj, error: true, loading: false });
    } else {
      setChapterObj({
        ...chapterObj,
        loading: false,
        openAddChapterDialog: false,
      });
      setChapterListObj({
        ...chapterListObj,
        chapterList: res?.chapterList?.chapterList,
      });
    }
  };
  const [chapterObj, setChapterObj] = useState(defaultChapterObj);
  useEffect(() => {
    getChapterList();
  }, []);
  return (
    <ScrollArea
      type="auto"
      style={{ height: "100%", maxWidth: "100%" }}
      scrollbars="vertical"
    >
      <Box mt={"3"} pr={"2"}>
        <Flex align={"center"} justify={"between"}>
          <Text size={"1"} color="gray">
            Chapters
          </Text>
          <IconButton
            variant="ghost"
            onClick={() =>
              setChapterObj({
                ...chapterObj,
                openAddChapterDialog: !chapterObj.openAddChapterDialog,
              })
            }
          >
            <PlusIcon color="gray" />
          </IconButton>
        </Flex>
        <Flex gap={"2"} direction={"column"} mt={"2"} pt={"2"}>
          {chapterListObj.loading ? (
            <Spinner className="mx-auto" />
          ) : chapterListObj.error ? (
            <Text size={"1"} align={"center"} color="red">
              Something went wrong
            </Text>
          ) : chapterListObj?.chapterList?.length === 0 ? (
            <Text size={"1"} align={"center"}>
              Chapters not found
            </Text>
          ) : (
            chapterListObj?.chapterList.map((item, index) => {
              const { chapterName, chapterId } = item;
              return (
                <Box key={chapterId}>
                  <Card
                    className={`${
                      chapterListObj.whichChapterSelected === index
                        ? "bg-[#9ceaff] text-800"
                        : ""
                    } select-none px-2 py-2`}
                    onClick={() => {
                      if (chapterListObj.whichChapterSelected === index) {
                        setChapterListObj({
                          ...chapterListObj,
                          whichChapterSelected: null,
                        });
                      } else {
                        setChapterListObj({
                          ...chapterListObj,
                          whichChapterSelected: index,
                        });
                      }
                    }}
                  >
                    <Flex align={"center"} justify={"between"}>
                      <Text size={"1"}>{chapterName}</Text>
                      <IconButton
                        variant="ghost"
                        className={`${
                          chapterListObj.whichChapterSelected === index
                            ? "text-800"
                            : "text-300"
                        }`}
                      >
                        {chapterListObj.whichChapterSelected === index ? (
                          <CaretUpIcon />
                        ) : (
                          <CaretDownIcon />
                        )}
                      </IconButton>
                    </Flex>
                  </Card>
                  <Box pl={"2"}>
                    {chapterListObj.whichChapterSelected === index ? (
                      <TopicList chapterId={chapterId} />
                    ) : null}
                  </Box>
                </Box>
              );
            })
          )}
        </Flex>
      </Box>
      <Dialog.Root open={chapterObj.openAddChapterDialog}>
        <Dialog.Content className="max-w-96">
          <Flex gap={"4"} direction={"column"}>
            <Dialog.Title>Add Chapter</Dialog.Title>
            <TextField.Root
              placeholder="Enter Chapter Name"
              value={chapterObj.chapterName}
              onChange={(e) => {
                setChapterObj({ ...chapterObj, chapterName: e.target.value });
              }}
            />
            {chapterObj.error && (
              <Text size={"2"} color="red" align={"center"}>
                Something went wrong
              </Text>
            )}
            <Flex align={"center"} justify={"end"} gap={"2"}>
              <Button
                variant="surface"
                onClick={() =>
                  setChapterObj({ ...chapterObj, openAddChapterDialog: false })
                }
              >
                Close
              </Button>
              <Button
                loading={chapterObj.loading}
                onClick={handleCreateChapter}
              >
                Create Chapter
              </Button>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </ScrollArea>
  );
}
function TopicList({ chapterId }) {
  const navigate = useNavigate();
  const defaultTopicListObj = {
    topicList: [],
    loading: true,
    error: false,
    whichTopicSelected: null,
  };
  const [topicListObj, setTopicListObj] = useState(defaultTopicListObj);
  const getTopicList = async () => {
    const res = await getTopics({ chapterId });
    if (res.error === true) {
      setTopicListObj({ ...topicListObj, error: true, loading: false });
    } else {
      setTopicListObj({
        ...topicListObj,
        topicList: res?.topicList?.topicList || [],
        loading: false,
      });
    }
  };
  const defaultTopicObj = {
    topicName: "",
    openAddTopicDialog: false,
    error: false,
    loading: false,
    topicYoutubeLink: "",
  };
  const handleCreateTopic = async () => {
    if (topicObj.topicName === "") {
      setTopicObj((prevTopicObj) => ({
        ...prevTopicObj,
        error: true,
      }));
      return;
    }
    setTopicObj((prevTopicObj) => ({
      ...prevTopicObj,
      loading: true,
    }));
    const userEditorDocRes = await addUserEditorDoc();
    if (userEditorDocRes.error === true) {
      setTopicListObj({ ...topicListObj, error: true, loading: false });
    } else {
      const res = await addTopic({
        chapterId,
        topicName: topicObj.topicName,
        userEditorDocId: userEditorDocRes?.userEditorDoc?.userEditorDocId,
      });
      if (res.error === true) {
        setTopicObj({ ...topicObj, error: true, loading: false });
      } else {
        setTopicObj({
          defaultTopicObj,
        });
        setTopicListObj({
          ...topicListObj,
          topicList: res?.topicList?.topicList,
        });
      }
    }
  };
  const [topicObj, setTopicObj] = useState(defaultTopicObj);
  useEffect(() => {
    getTopicList();
  }, []);
  return (
    <ScrollArea
      type="auto"
      style={{ height: "100%", maxWidth: "100%" }}
      scrollbars="vertical"
    >
      <Box mt={"3"} pr={"2"}>
        <Flex align={"center"} justify={"between"}>
          <Text size={"1"} color="gray">
            Topics
          </Text>
          <IconButton
            variant="ghost"
            onClick={() =>
              setTopicObj({
                ...topicObj,
                openAddTopicDialog: !topicObj.openAddTopicDialog,
              })
            }
          >
            <PlusIcon color="gray" />
          </IconButton>
        </Flex>
        <Flex gap={"2"} direction={"column"} mt={"2"} pt={"2"}>
          {topicListObj.loading ? (
            <Spinner className="mx-auto" />
          ) : topicListObj.error ? (
            <Text size={"1"} align={"center"} color="red">
              Something went wrong
            </Text>
          ) : topicListObj?.topicList?.length === 0 ? (
            <Text size={"1"} align={"center"}>
              No topics present
            </Text>
          ) : (
            topicListObj?.topicList.map((item, index) => {
              const { topicName, topicId, userEditorDocId } = item;
              return (
                <Box key={topicId}>
                  <Card
                    className={`${
                      topicListObj.whichTopicSelected === index
                        ? "bg-[#9ceaff] text-800"
                        : ""
                    } select-none px-2 py-2`}
                    onClick={() => {
                      setTopicListObj({
                        ...topicListObj,
                        whichTopicSelected: index,
                      });
                      navigate(`./editor`, {
                        state: {
                          userEditorDocId,
                        },
                      });
                    }}
                  >
                    <Flex align={"center"} justify={"between"}>
                      <Text size={"1"}>{topicName}</Text>
                      <ArrowRightIcon />
                    </Flex>
                  </Card>
                </Box>
              );
            })
          )}
        </Flex>
      </Box>
      <Dialog.Root open={topicObj.openAddTopicDialog}>
        <Dialog.Content className="max-w-96">
          <Flex gap={"4"} direction={"column"}>
            <Dialog.Title>Add topic</Dialog.Title>
            <TextField.Root
              placeholder="Enter Topic Name"
              value={topicObj.topicName}
              onChange={(e) => {
                setTopicObj({ ...topicObj, topicName: e.target.value });
              }}
              required
            />
            {/* <Flex
              align={"center"}
              width={"100%"}
              justify={"center"}
              gap={"2"}
              my={"3"}
            >
              <Separator className="w-50" />
              <Text size={"1"} color="gray">
                Or
              </Text>
              <Separator className="w-50" />
            </Flex>
            <TextField.Root
              placeholder="Enter Topic Youtube Link"
              value={topicObj.topicYoutubeLink}
              onChange={(e) => {
                setTopicObj({ ...topicObj, topicYoutubeLink: e.target.value });
              }}
              type="url"
            />
            <Text align={"center"} size={"1"} color="gray">
              Make sure the video has transcript
            </Text> */}
            {topicObj.error && (
              <Text size={"2"} color="red" align={"center"}>
                Something went wrong
              </Text>
            )}
            <Flex align={"center"} justify={"end"} gap={"2"}>
              <Button
                variant="surface"
                onClick={() =>
                  setTopicObj({ ...topicObj, openAddTopicDialog: false })
                }
              >
                Close
              </Button>
              <Button loading={topicObj.loading} onClick={handleCreateTopic}>
                Create topic
              </Button>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </ScrollArea>
  );
}

// import { PlusIcon, CaretUpIcon, CaretDownIcon } from "@radix-ui/react-icons";
// import { useState, useEffect } from "react";
// import {
//   addChapter,
//   addUserEditorDoc,
//   getChapters,
//   getSubjects,
//   getTopics,
//   addTopic,
// } from "../utils";
// import { useNavigate } from "react-router-dom";

// function TopicList({ chapterId }) {
//   const navigate = useNavigate();
//   const initialTopicListObj = {
//     topicList: [],
//     error: false,
//     loading: true,
//   };
//   const [topicListObj, setTopicListObj] = useState(initialTopicListObj);
//   const [whichChapterTopicVisible, setWhichChapterTopicVisible] = useState("");

//   const getTopicList = async () => {
//     const res = await getTopics({ chapterId });
//     if (!res.error?.error) {
//       setTopicListObj({
//         ...topicListObj,
//         topicList: res?.topicList?.topicList || [],
//         loading: false,
//       });
//     } else {
//       setTopicListObj({ ...topicListObj, error: true, loading: false });
//     }
//   };

//   const handleAddTopic = async ({ topicName }) => {
//     if (!topicName) {
//       alert("Invalid Topic Name");
//     }
//     const item = localStorage.getItem("user");
//     if (!item || item === "undefined") {
//       navigate("/");
//     }
//     const user = JSON.parse(item);
//     const res = await addUserEditorDoc({ userId: user?.userId });
//     let userEditorDocObj;
//     if (!res.error?.error) {
//       userEditorDocObj = {
//         userEditorDocId: res?.userEditorDoc?.userEditorDocId,
//         userEditorDocData: res?.userEditorDoc?.userEditorDocData,
//       };
//       const result = await addTopic({
//         chapterId,
//         topicName,
//         userEditorDocId: userEditorDocObj.userEditorDocId,
//       });
//       if (!result.error?.error) {
//       } else {
//         alert("unable to add Topic");
//       }
//     } else {
//       alert("unable to add Topic");
//     }
//   };

//   const handleTopicClick = ({ topicId, userEditorDocId }) => {
//     setWhichChapterTopicVisible(topicId);
//     navigate("./editor", { state: { userEditorDocId } });
//   };
//   useEffect(() => {
//     getTopicList();
//   }, []);
//   return (
//     <div className="ml-2 mt-1 select-none">
//       <div className="flex justify-between items-center pr-2">
//         <p className="text-xs text-300 font-semibold">Topics</p>
//         <div
//           onClick={() => {
//             const topicName = prompt("Enter topic Name");
//             handleAddTopic({ topicName });
//           }}
//         >
//           <PlusIcon className="text-300" />
//         </div>
//       </div>
//       <div className="flex flex-col gap-3 mt-2">
//         {topicListObj?.topicList?.map((topic) => {
//           const { topicName, userEditorDocId, topicId } = topic;
//           return (
//             <div
//               onClick={() => handleTopicClick({ userEditorDocId, topicId })}
//               key={topicId}
//               className={`${
//                 whichChapterTopicVisible === topicId ? "bg-200" : "bg-100"
//               } flex justify-between py-1 px-2 rounded-lg`}
//             >
//               <p>{topicName}</p>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function ChapterList({ subjectId }) {
//   const initialChapterListObj = {
//     chapterList: [],
//     error: false,
//     loading: true,
//   };
//   const [chapterListObj, setChapterListObj] = useState(initialChapterListObj);
//   const [whichChapterTopicVisible, setWhichChapterTopicVisible] = useState("");

//   const getChapterList = async () => {
//     const res = await getChapters({ subjectId });
//     if (!res.error?.error) {
//       setChapterListObj({
//         ...chapterListObj,
//         chapterList: res?.chapterList?.chapterList || [],
//         loading: false,
//       });
//     } else {
//       setSubjectListObj({ ...chapterListObj, error: true, loading: false });
//     }
//   };
//   const handleAddChapter = async (chapterName) => {
//     if (!chapterName) {
//       alert("Invalid chapter Name");
//     }
//     const res = await addChapter({ subjectId, chapterName });
//     console.log({ res }, "sdfds");
//     if (!res.error?.error) {
//       setChapterListObj({
//         ...chapterListObj,
//         chapterList: res?.chapterList?.chapterList || [],
//         loading: false,
//       });
//     } else {
//       setSubjectListObj({ ...chapterListObj, error: true, loading: false });
//     }
//   };
//   useEffect(() => {
//     getChapterList();
//   }, []);
//   return (
//     <div className="ml-2 mt-1 select-none">
//       <div className="flex justify-between items-center pr-2">
//         <p className="text-xs text-300 font-semibold">Chapters</p>
//         <div
//           onClick={() => {
//             const chapterName = prompt("Enter Subject Name");
//             handleAddChapter(chapterName);
//           }}
//         >
//           <PlusIcon className="text-300" />
//         </div>
//       </div>
//       <div className="flex flex-col gap-3 mt-2">
//         {chapterListObj?.chapterList.map((chapter) => {
//           const { chapterId, chapterName } = chapter;
//           return (
//             <div key={chapterId}>
//               <div
//                 className="flex justify-between bg-100 py-1 px-2 rounded-lg items-center "
//                 onClick={() => {
//                   whichChapterTopicVisible === chapterId
//                     ? setWhichChapterTopicVisible("")
//                     : setWhichChapterTopicVisible(chapterId);
//                 }}
//               >
//                 <p>{chapterName}</p>

//                 {whichChapterTopicVisible === chapterId ? (
//                   <CaretUpIcon />
//                 ) : (
//                   <CaretDownIcon />
//                 )}
//               </div>
//               {whichChapterTopicVisible === chapterId && (
//                 <TopicList chapterId={chapterId} />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function MenuList() {
//   const initialSubjectListObj = {
//     subjectList: [],
//     error: false,
//     loading: true,
//   };
//   const [subjectListObj, setSubjectListObj] = useState(initialSubjectListObj);
//   const [whichSubjectChapterVisible, setWhichSubjectChapterVisible] =
//     useState("");
//   const navigate = useNavigate();
//   const getSubjectList = async (userId) => {
//     const res = await getSubjects({ userId });
//     if (!res.error?.error) {
//       setSubjectListObj({
//         ...subjectListObj,
//         subjectList: res?.subjectList?.subjectList || [],
//         loading: false,
//       });
//     } else {
//       setSubjectListObj({ ...setSubjectListObj, error: true, loading: false });
//     }
//   };
//   useEffect(() => {
//     const item = localStorage.getItem("user");
//     if (!item || item === "undefined") {
//       navigate("/");
//     }
//     const user = JSON.parse(item);
//     getSubjectList(user?.userId);
//   }, []);
//   return (
//     <div className="menuList mt-3 mb-6 select-none">
//       <p className="text-xs text-300 font-semibold ">Subjects</p>
//       {subjectListObj.loading && (
//         <p className="text-400 text-sm text-center my-2">Loading....</p>
//       )}
//       <div className="flex flex-col gap-3 mt-2">
//         {subjectListObj.subjectList?.map((subject) => {
//           const { subjectId, subjectName } = subject;
//           return (
//             <div key={subjectId}>
//               <div
//                 className={`${
//                   whichSubjectChapterVisible === subjectId ? "bg-200" : "bg-100"
//                 } flex justify-between  py-1 px-2 rounded-lg items-center `}
//                 onClick={() => {
//                   whichSubjectChapterVisible === subjectId
//                     ? setWhichSubjectChapterVisible("")
//                     : setWhichSubjectChapterVisible(subjectId);
//                 }}
//               >
//                 <p>{subjectName}</p>
//                 {whichSubjectChapterVisible === subjectId ? (
//                   <CaretUpIcon />
//                 ) : (
//                   <CaretDownIcon />
//                 )}
//               </div>
//               {whichSubjectChapterVisible === subjectId && (
//                 <ChapterList subjectId={subjectId} />
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default MenuList;
