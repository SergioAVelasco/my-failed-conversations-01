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
      {historyData.map((columnData: ColumnData) => {
        return (
          <Column>
            {columnData.map((element: DataElement) => {
              return <div>{element.commits}</div>;
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
