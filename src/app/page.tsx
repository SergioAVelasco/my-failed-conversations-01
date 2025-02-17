"use client";
import { useEffect, useState, ReactNode } from "react";
import styles from "./page.module.css";
import { DataElement, ColumnData, HistoryData } from "@/types/pageTypes";

const GITHUG_API =
  "https://raw.githubusercontent.com/jamesman11/us-map/master/github_commits_payload.json";

export default function Home() {
  const [historyData, setHistoryData] = useState<HistoryData>([]);

  useEffect(() => {
    fetch(GITHUG_API).then((response) => {
      response.json().then((data) => {
        setHistoryData(data);
      });
    });
  }, []);

  return (
    <div className={styles.container}>
      {historyData.map((columnData: ColumnData, index: number) => {
        return (
          <Column key={`column-${index}`}>
            {columnData.map((element: DataElement, index: number) => {
              return (
                <SingleCommit
                  commits={element.commits}
                  key={`commit-${index}`}
                />
              );
            })}
          </Column>
        );
      })}
    </div>
  );
}

const Column = ({ children }: { children: ReactNode }) => {
  return <div className={styles.column}>{children}</div>;
};

const SingleCommit = ({ commits }: { commits: number }) => {
  console.log(commits);
  const backgroudColor = (count: number) => {
    switch (count) {
      case 1:
      case 2:
        return styles.l1;
        break;
      case 3:
      case 4:
        return styles.l2;
        break;
      case 5:
      case 6:
        return styles.l3;
        break;
      default:
        return styles.l4;
    }
  };
  return <div className={`${styles.item} ${backgroudColor(commits)}`}></div>;
};
