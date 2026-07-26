import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

type Student = {
  firstName: string;
  lastName: string;
  url: string;
};

export default function HomePage() {
  const [students, setStudents] = useState<Student[]>([]);
  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE_URL ?? '';
    const fetchStudents = async () => {
      const response = await fetch(`${base}/data/data.json`, { cache: 'no-store' });
      const data: Student[] = await response.json();
      setStudents(data);
    };
    fetchStudents();
  }, []);
  return (
    <>
      <h1 className="page-title">一覧ページ</h1>
      <Link to="/register" className="btn btn-primary">
        新規登録
      </Link>

      <dl className={styles.studentList}>
        {students.map((student) => (
          <div className={styles.studentListItem} key={student.url}>
            <dt>{`${student.lastName} ${student.firstName}`}</dt>
            <dd>
              <a href={student.url} target="_blank" rel="noopener noreferrer">
                {student.url}
              </a>
            </dd>
          </div>
        ))}
      </dl>
    </>
  );
}
