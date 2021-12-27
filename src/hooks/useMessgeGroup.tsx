import { useEffect, useState } from "react";
import ChatMessage from "../types/ChatMessage";

const useMessageGroup = (rawMessages: ChatMessage[]): ChatMessage[][] => {
  const [groups, setGroups] = useState<ChatMessage[][]>([]);

  useEffect(() => {
    if (rawMessages.length === 0) {
      return;
    }

    const splitted = rawMessages.reduce(
      (acc: ChatMessage[][], cur) => {
        const target = acc[acc.length - 1];
        if (target.length === 0 || target[0].senderId === cur.senderId) {
          target.push(cur);
        } else {
          acc.push([cur]);
        }
        return acc;
      },
      [[]]
    );
    setGroups(splitted);
  }, [rawMessages]);

  return groups;
};

export default useMessageGroup;
