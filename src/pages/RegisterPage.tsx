import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const base = import.meta.env.VITE_API_BASE_URL ?? '';

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`${base}/register.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        url,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status === 'ok') {
      navigate('/');
    } else {
      setMsg('リンクの登録に失敗しました。');
    }
  };
  return (
    <>
      <h1 className="page-title">登録ページ</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="last-name">
            姓
          </label>
          <input className={styles.formControl} type="text" name="lastName" id="last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required aria-required="true" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="first-name">
            名
          </label>
          <input className={styles.formControl} type="text" name="firstName" id="first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required aria-required="true" />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel} htmlFor="url">
            URL
          </label>
          <input
            className={styles.formControl}
            type="url"
            name="url"
            id="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
            required
            aria-required="true"
          />
        </div>
        <div className={[styles.formBtnWrapper, styles.formBtnWrapperReverse].join(' ')}>
          <input type="submit" value="登録" className="btn btn-primary" />
          <Link className="btn btn-secondary" to="/">
            一覧へ戻る
          </Link>
        </div>
      </form>
      {msg && <p className={styles.errorMsg}>{msg}</p>}
    </>
  );
}
