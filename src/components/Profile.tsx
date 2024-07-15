import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import "../components/css/profile.css";

interface ProfileData {
  name: string;
  id: number;
  userID: string;
  password: string;
  email: string;
}

const Profile = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { userID } = router.query;

  const fetchProfile = useCallback(async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      const storedUserID = storedUser ? storedUser.userID : null;

      if (!storedUserID) {
        setLoading(false);
        alert("로그인을 해주세요!");
        router.push("/login");
        return;
      }

      const response = await axios.get('/api/profile/getprofile', {
        params: { userID: storedUserID }
      });

      const profileData = response.data;
      console.log("Fetched profile data:", profileData); // API 응답 확인

      if (profileData) {
        setProfile(profileData);
        setEmail(profileData.email);
        setPassword(profileData.password);
      } else {
        console.error("Profile data is empty");
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const handleSubmit = async () => {
    try {

      await axios.put(`/api/profile/updateprofile`, {
       
        userID:userID,

        email: email,
        password: password,
      });
      router.push(`/profile/${profile.userID}`);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <section className="profile_section">
      <div key={profile.id} className="profile_div">
        <div className="profile">
          <Image className="user" src="/assets/images/user.png" alt="user" width={200} height={200} />
        </div>
        <div className="info_div">
          <div className="name"><p className="name_p">{profile.name}</p></div>
          <div className="password_div">
            <input
              type="password"
              className="password_input"
              placeholder={profile.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="email_div">
            <input
              className="email_input"
              type="text"
              placeholder={profile.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button className="edit_btn" onClick={handleSubmit}>수정하기</button>
      </div>
    </section>
  );
}

export default Profile;
