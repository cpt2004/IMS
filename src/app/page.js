"use client";
import './globals.css';
import ViewData from './components/viewData';
import AddData from './components/addData';

export const apiUrl = 'https://tup1.pythonanywhere.com';
// export const apiUrl = "http://127.0.0.1:8000"

export default function Home() {
  
  return (
    <div className='body'>
      <h1 className='title'>Student Data</h1>
      <hr/>
      <AddData/>
      <ViewData/>  
    </div>
  );
};