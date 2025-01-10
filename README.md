# Reddit Clone  
A modern Reddit clone built with **Next.js 15**, **React 19**, and **Tailwind CSS**, replicating the core features and design principles of Reddit while leveraging cutting-edge web technologies. This project offers a seamless and responsive experience with an emphasis on user interactions, accessibility, and scalability.

## Features  
- **Dark/Light Mode**: Built-in theme toggle for a better user experience.  
- **Reddit-Style Feed Layout**: Familiar UI showcasing posts in categories like Hot, New, Controversial, Rising, and Top.  
- **Post Categorization**: Filter posts by predefined categories and sort them with ease.  
- **Time-Based Filtering**: View content by day, week, month, year, or all-time popularity.  
- **Responsive Design**: Fully optimized for desktops, tablets, and mobile devices.  
- **Image Optimization**: Automatically resizes and optimizes images for fast loading.  
- **Interactive Voting System**: Upvote/downvote system to engage users.  
- **Authentication with Reddit API**: OAuth-based login to fetch personalized data.  
- **Highly Modular Components**: Built with reusable and scalable components using Radix UI.  

---

## Tech Stack  
- **Next.js**: Version 15.1.4  
- **React**: Version 19.0.0  
- **Tailwind CSS**: Version 3.4  
- **Radix UI**: Highly accessible React components.  
- **Lucide React Icons**: Lightweight and customizable icons.  

---

## Getting Started  

### Prerequisites  
- **Node.js** (Latest LTS version recommended)  
- **npm** or **yarn** for dependency management  

### Installation  

1. Clone the repository:  
   ```bash
   git clone https://github.com/TheUzair/Reddit-Clone.git
   cd reddit-clone
   ```

2. Install dependencies:  
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory:  
   ```env
   REDDIT_CLIENT_ID=your_client_id
   REDDIT_CLIENT_SECRET=your_client_secret
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

4. Run the development server:  
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.  

---

### Build  
To create an optimized production build:  
```bash
npm run build
# or
yarn build
```

### Production  
To run the production build:  
```bash
npm run start
# or
yarn start
```

---

## Project Structure  
```plaintext
reddit-clone/
├── app/
│   ├── api/
│   │   ├── reddit-auth/      # Authentication-related API
│   │   └── reddit-data/      # Data fetching endpoints
│   └── page.js              # Main application entry point
├── components/
│   └── ui/                  # Reusable UI components
├── public/                  # Public assets like images
├── styles/                  # Global CSS and Tailwind styles
├── .env.local               # Environment variables
└── README.md                # Project documentation
```

---

## Contributing  

1. Fork the repository.  
2. Create your feature branch:  
   ```bash
   git checkout -b feature/amazing-feature
   ```  
3. Commit your changes:  
   ```bash
   git commit -m "Add some amazing feature"
   ```  
4. Push to the branch:  
   ```bash
   git push origin feature/amazing-feature
   ```  
5. Open a Pull Request.  

---

## License  
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.  

---

## Acknowledgments  
- **[Reddit API](https://www.reddit.com/dev/api/)**: For enabling the integration of Reddit's core functionality.  
- **[Next.js Team](https://nextjs.org/)**: For providing a powerful framework for server-rendered and statically generated apps.  
- **[Tailwind CSS Team](https://tailwindcss.com/)**: For delivering a utility-first CSS framework.  
- **[Radix UI Team](https://www.radix-ui.com/)**: For offering a suite of accessible UI primitives.  

---

## Future Enhancements  
- **User Profiles**: Add the ability to create and manage user profiles.  
- **Post Drafts**: Allow users to save drafts for posts.  
- **Real-Time Comments**: Integrate WebSocket for real-time updates on comments and votes.  
- **Notifications System**: Implement push notifications for mentions and updates.  
- **Admin Panel**: Add an admin interface for content moderation.  
