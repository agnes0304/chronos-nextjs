"use client";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { User } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON || ''

const GithubOauth = () => {
  const [user, setUser] = useState<User | null>(null);

  // const GithubOauthHandler = async () => {
  //   try {
  //     const res = await fetch(`${baseUrl}/signin/github`);

  //   } catch (error) {
  //     console.log("There was a problem with the fetch operation:", error);
  //   }
  // };

  useEffect(() => {
    window.addEventListener('hashchange', function() {
      console.log('hash changed')
      checkUser()
    })
  }
  , [])

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }

  const supabase = createClient(supabaseUrl, supabaseAnon)

  async function signInWithGithub() {
    await supabase.auth.signInWithOAuth({
      provider: 'github'
    })
  }
  async function signOut() {
    await supabase.auth.signOut()
  }

  return (
    <div>
      <button
        className="text-white bg-gray-600 hover:bg-gray-700 active:bg-gray-800 h-[42px] w-[160px] p-2 border rounded-full text-md flex justify-center items-center group px-2 transition-all duration-200 ease-in-out"
        type="button"
        // onClick={() => GithubOauthHandler()}
        onClick={() => signInWithGithub()}
      >
        <FontAwesomeIcon icon={faGithub} className="mr-2" />
        Github로 로그인
      </button>
    </div>
  );
};

export default GithubOauth;
