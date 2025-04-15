// app/components/ProfileCard.tsx
'use client'

import React, { useState } from 'react';
import Modal from './Modal';
import Image from 'next/image';
import { TwitterIcon, GithubIcon, LinkedinIcon } from 'lucide-react'; // Using lucide-react for icons

const ProfileCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="component-border m-4 p-4 rounded-lg shadow-lg">
        <div className="flex items-center space-x-4">
          <Image
            src="/MyEyes.jpg"
            alt="Profile"
            width={125}
            height={400}
            className="rounded-md border-2 border-silver"
          />
          <div>
            <h2 className="text-xl font-bold text-white">Izzy Yii-Hunnid</h2>
            <p className="text-sm text-silver">@vihunnid</p>
          </div>
        </div>
        <p className="my-4 text-sm text-gray-300">
          I’m a passionate Software Engineer with a love for crafting scalable web applications, and a Poet who weaves words into emotions. With over 5 years in tech, I specialize in TypeScript, Next.js, and creative writing, blending logic and art to create meaningful experiences.
        </p>
        <div className="flex space-x-4 mb-4">
          <a href="https://twitter.com/vihunnid" target="_blank" rel="noopener noreferrer" className="text-silver hover:text-white transition">
            <TwitterIcon className="h-6 w-6" />
          </a>
          <a href="https://github.com/vihunnid" target="_blank" rel="noopener noreferrer" className="text-silver hover:text-white transition">
            <GithubIcon className="h-6 w-6" />
          </a>
          <a href="https://linkedin.com/in/vihunnid" target="_blank" rel="noopener noreferrer" className="text-silver hover:text-white transition">
            <LinkedinIcon className="h-6 w-6" />
          </a>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full border border-silver text-white px-4 py-2 rounded hover:bg-silver hover:text-black transition"
        >
          Edit Profile
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Profile"
      >
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              defaultValue="Izzy Yii-Hunnid"
              className="w-full p-2 rounded bg-black border border-silver text-white focus:outline-none focus:ring-2 focus:ring-silver"
            />
          </div>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              defaultValue="@vihunnid"
              className="w-full p-2 rounded bg-black border border-silver text-white focus:outline-none focus:ring-2 focus:ring-silver"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-300">
              Bio
            </label>
            <textarea
              id="bio"
              defaultValue="I’m a passionate Software Engineer with a love for crafting scalable web applications, and a Poet who weaves words into emotions. With over 5 years in tech, I specialize in TypeScript, Next.js, and creative writing, blending logic and art to create meaningful experiences."
              className="w-full p-2 rounded bg-black border border-silver text-white focus:outline-none focus:ring-2 focus:ring-silver"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-silver text-black px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Save Changes
          </button>
        </form>
      </Modal>
    </>
  );
};

export default ProfileCard;
