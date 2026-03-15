// export interface Movie {
//   id: string;
//   title: string;
//   rating: number;
//   genre: string;
//   duration: string;
//   language: string;
//   description: string;
//   poster: string;
//   banner: string;
//   releaseDate: string;
//   cast: string[];
//   director: string;
// }

// export const movies: Movie[] = [
//   {
//     id: "1",
//     title: "The Dark Sentinel",
//     rating: 4.5,
//     genre: "Action, Thriller",
//     duration: "2h 28m",
//     language: "English",
//     description:
//       "A gripping action thriller that follows an elite operative on a mission to stop a global conspiracy. With stunning visuals and heart-pounding sequences, this film delivers non-stop entertainment.",
//     poster:
//       "https://images.unsplash.com/photo-1643677841226-d6427625f118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlciUyMGRhcmt8ZW58MXx8fHwxNzczMzgyNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
//     banner:
//       "https://images.unsplash.com/photo-1643677841226-d6427625f118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlciUyMGRhcmt8ZW58MXx8fHwxNzczMzgyNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
//     releaseDate: "March 15, 2026",
//     cast: ["Chris Evans", "Scarlett Johansson", "Idris Elba"],
//     director: "Christopher Nolan",
//   },
//   {
//     id: "2",
//     title: "Cosmic Odyssey",
//     rating: 4.8,
//     genre: "Sci-Fi, Adventure",
//     duration: "2h 45m",
//     language: "English",
//     description:
//       "An epic space adventure that explores the far reaches of the galaxy. Join a crew of explorers as they discover new worlds and face unprecedented challenges in the cosmos.",
//     poster:
//       "https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzM0MDQ5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     banner:
//       "https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2ktZmklMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzM0MDQ5NjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     releaseDate: "March 8, 2026",
//     cast: ["Matt Damon", "Jessica Chastain", "Michael Peña"],
//     director: "Denis Villeneuve",
//   },
//   {
//     id: "3",
//     title: "Shadows of Fear",
//     rating: 4.2,
//     genre: "Horror, Mystery",
//     duration: "1h 55m",
//     language: "English",
//     description:
//       "A chilling horror mystery that will keep you on the edge of your seat. When a family moves into an old mansion, they discover dark secrets that should have remained buried.",
//     poster:
//       "https://images.unsplash.com/photo-1620489867172-890a08b2228b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBtb3ZpZSUyMHBvc3RlciUyMGRhcmt8ZW58MXx8fHwxNzczNDI1MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
//     banner:
//       "https://images.unsplash.com/photo-1620489867172-890a08b2228b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3Jyb3IlMjBtb3ZpZSUyMHBvc3RlciUyMGRhcmt8ZW58MXx8fHwxNzczNDI1MzA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
//     releaseDate: "March 22, 2026",
//     cast: ["Vera Farmiga", "Patrick Wilson", "Madison Iseman"],
//     director: "James Wan",
//   },
//   {
//     id: "4",
//     title: "The Final Chase",
//     rating: 4.6,
//     genre: "Thriller, Crime",
//     duration: "2h 15m",
//     language: "English",
//     description:
//       "A high-stakes thriller following a detective's pursuit of a notorious criminal mastermind. With twists at every turn, this edge-of-your-seat thriller will keep you guessing until the end.",
//     poster:
//       "https://images.unsplash.com/photo-1765510296004-614b6cc204da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpbGxlciUyMG1vdmllJTIwcG9zdGVyfGVufDF8fHx8MTc3MzQwNDk2MXww&ixlib=rb-4.1.0&q=80&w=1080",
//     banner:
//       "https://images.unsplash.com/photo-1765510296004-614b6cc204da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aHJpbGxlciUyMG1vdmllJTIwcG9zdGVyfGVufDF8fHx8MTc3MzQwNDk2MXww&ixlib=rb-4.1.0&q=80&w=1080",
//     releaseDate: "April 5, 2026",
//     cast: ["Jake Gyllenhaal", "Emily Blunt", "Oscar Isaac"],
//     director: "David Fincher",
//   },
//   {
//     id: "5",
//     title: "Galactic Warriors",
//     rating: 4.7,
//     genre: "Sci-Fi, Action",
//     duration: "2h 35m",
//     language: "English",
//     description:
//       "An intergalactic war threatens the existence of humanity. A team of elite warriors must band together to save civilization from extinction in this visually stunning sci-fi epic.",
//     poster:
//       "https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzM0NjU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     banner:
//       "https://images.unsplash.com/photo-1761948245703-cbf27a3e7502?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NzM0NjU3MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
//     releaseDate: "April 19, 2026",
//     cast: ["Zoe Saldana", "Chris Pratt", "Dave Bautista"],
//     director: "James Gunn",
//   },
//   {
//     id: "6",
//     title: "Mystery at Midnight",
//     rating: 4.3,
//     genre: "Mystery, Drama",
//     duration: "2h 10m",
//     language: "English",
//     description:
//       "A captivating mystery unfolds when a renowned detective is called to solve a series of inexplicable events in a small town. Nothing is as it seems in this atmospheric thriller.",
//     poster:
//       "https://images.unsplash.com/photo-1643677841226-d6427625f118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlciUyMGRhcmt8ZW58MXx8fHwxNzczMzgyNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
//     banner:
//       "https://images.unsplash.com/photo-1643677841226-d6427625f118?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlciUyMGRhcmt8ZW58MXx8fHwxNzczMzgyNzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
//     releaseDate: "May 3, 2026",
//     cast: ["Benedict Cumberbatch", "Rachel Weisz", "Tom Hiddleston"],
//     director: "Rian Johnson",
//   },
// ];

export const theatres = [
  {
    id: "1",
    name: "CineMax IMAX",
    location: "Downtown Plaza",
    distance: "2.5 km",
    showtimes: ["10:30 AM", "1:45 PM", "5:00 PM", "8:15 PM", "11:30 PM"],
  },
  {
    id: "2",
    name: "PVR Cinemas",
    location: "Mall Road",
    distance: "3.2 km",
    showtimes: ["11:00 AM", "2:15 PM", "5:30 PM", "8:45 PM"],
  },
  {
    id: "3",
    name: "INOX Theatre",
    location: "City Center",
    distance: "4.1 km",
    showtimes: ["12:00 PM", "3:15 PM", "6:30 PM", "9:45 PM"],
  },
  {
    id: "4",
    name: "Carnival Cinemas",
    location: "Riverside Mall",
    distance: "5.0 km",
    showtimes: ["10:00 AM", "1:15 PM", "4:30 PM", "7:45 PM", "11:00 PM"],
  },
];

export const reviews = [
  {
    id: "1",
    user: "John Smith",
    rating: 5,
    comment:
      "Absolutely mind-blowing! The visual effects are stunning and the story keeps you engaged from start to finish.",
    date: "March 10, 2026",
  },
  {
    id: "2",
    user: "Sarah Johnson",
    rating: 4,
    comment:
      "Great movie with excellent performances. The cinematography is top-notch. Highly recommended!",
    date: "March 9, 2026",
  },
  {
    id: "3",
    user: "Michael Chen",
    rating: 5,
    comment:
      "Best movie I've seen this year! The director did an amazing job bringing this story to life.",
    date: "March 8, 2026",
  },
  {
    id: "4",
    user: "Emily Davis",
    rating: 4,
    comment:
      "Solid entertainment with great action sequences. The cast delivered outstanding performances.",
    date: "March 7, 2026",
  },
];

export interface Movie {
  id: string;
  title: string;
  rating: number;
  genre: string;
  duration: string;
  language: string;
  description: string;
  poster: string;
  banner: string;
  releaseDate: string;
  cast: string[];
  director: string;
}

export const movies: Movie[] = [
  {
    id: "7",
    title: "Pushpa 2: The Rule",
    rating: 4.7,
    genre: "Action, Drama",
    duration: "2h 55m",
    language: "Telugu",
    description:
      "The much-awaited sequel continues the rise of Pushpa Raj in the red sandalwood smuggling empire as he faces powerful enemies.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIjdVFrVlOfft4BjWnnkHXOLPgwQYpaQLUw&s",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZIjdVFrVlOfft4BjWnnkHXOLPgwQYpaQLUw&s",
    releaseDate: "December 2024",
    cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil"],
    director: "Sukumar",
  },

  {
    id: "8",
    title: "Devara: Part 1",
    rating: 4.6,
    genre: "Action, Drama",
    duration: "2h 50m",
    language: "Telugu",
    description:
      "A powerful action drama set in coastal lands where a fearless leader fights for justice.",
    poster: "https://m.media-amazon.com/images/M/MV5BNWY4NDgyN2QtNDRkZS00OGRjLWFhN2UtODc3Mzk2ZjQ0ZjhkXkEyXkFqcGc@._V1_.jpg",
    banner: "https://m.media-amazon.com/images/M/MV5BNWY4NDgyN2QtNDRkZS00OGRjLWFhN2UtODc3Mzk2ZjQ0ZjhkXkEyXkFqcGc@._V1_.jpg",
    releaseDate: "September 2024",
    cast: ["Jr NTR", "Janhvi Kapoor", "Saif Ali Khan"],
    director: "Koratala Siva",
  },

  {
    id: "9",
    title: "Kalki 2898 AD",
    rating: 4.8,
    genre: "Sci-Fi, Action",
    duration: "2h 56m",
    language: "Telugu",
    description:
      "A futuristic sci-fi epic set in a dystopian world where warriors battle to protect humanity.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30v0PxKC-IBFQHSkGOh2LsB8-h6wJjiB-OQ&s",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT30v0PxKC-IBFQHSkGOh2LsB8-h6wJjiB-OQ&s",
    releaseDate: "June 2024",
    cast: ["Prabhas", "Deepika Padukone", "Amitabh Bachchan"],
    director: "Nag Ashwin",
  },

  {
    id: "10",
    title: "Game Changer",
    rating: 4.5,
    genre: "Political, Action",
    duration: "2h 40m",
    language: "Telugu",
    description:
      "A gripping political drama where an honest officer fights corruption.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDWKWf0c3UZ6beOmhwg_NrzVAyMOxE-lK5Ww&s",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDWKWf0c3UZ6beOmhwg_NrzVAyMOxE-lK5Ww&s",
    releaseDate: "2025",
    cast: ["Ram Charan", "Kiara Advani"],
    director: "Shankar",
  },

  {
    id: "11",
    title: "Salaar",
    rating: 4.6,
    genre: "Action, Thriller",
    duration: "2h 55m",
    language: "Telugu",
    description:
      "An intense action drama about friendship, betrayal, and the rise of a powerful leader.",
    poster: "https://chinmaynakhwa.wordpress.com/wp-content/uploads/2023/12/wp-17032610754067326981864121982714.jpg?w=555",
    banner: "https://chinmaynakhwa.wordpress.com/wp-content/uploads/2023/12/wp-17032610754067326981864121982714.jpg?w=555",
    releaseDate: "December 2023",
    cast: ["Prabhas", "Prithviraj Sukumaran", "Shruti Haasan"],
    director: "Prashanth Neel",
  },

  {
    id: "12",
    title: "Ustaad Bhagat Singh",
    rating: 4.4,
    genre: "Action, Drama",
    duration: "2h 30m",
    language: "Telugu",
    description:
      "A high-energy action entertainer featuring a fearless police officer.",
    poster: "https://m.media-amazon.com/images/M/MV5BMjQ5MGJhODUtYTJiZC00MDI3LWFhMDItMGUyODI1ZGU3ZmI4XkEyXkFqcGc@._V1_QL75_UX190_CR0,1,190,281_.jpg",
    banner: "https://m.media-amazon.com/images/M/MV5BMjQ5MGJhODUtYTJiZC00MDI3LWFhMDItMGUyODI1ZGU3ZmI4XkEyXkFqcGc@._V1_QL75_UX190_CR0,1,190,281_.jpg",
    releaseDate: "2025",
    cast: ["Pawan Kalyan", "Sreeleela"],
    director: "Harish Shankar",
  },

  {
    id: "13",
    title: "Toxic",
    rating: 4.5,
    genre: "Action, Crime",
    duration: "2h 35m",
    language: "Hindi",
    description:
      "A dark action drama following the rise of a powerful underworld figure.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSa4xtTOQpl38WgxAofm3ZQ1abLQs7SRcYV7wXJNP4P9dCoIXWnTRZOe3HIoSzmx8kEBQXUj8HQ1MOv-F6yhotVxPwIMzzzT4xCMOqzvc&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSa4xtTOQpl38WgxAofm3ZQ1abLQs7SRcYV7wXJNP4P9dCoIXWnTRZOe3HIoSzmx8kEBQXUj8HQ1MOv-F6yhotVxPwIMzzzT4xCMOqzvc&s=10",
    releaseDate: "2025",
    cast: ["Yash"],
    director: "Geetu Mohandas",
  },

  {
    id: "14",
    title: "War 2",
    rating: 4.6,
    genre: "Action, Spy",
    duration: "2h 40m",
    language: "Hindi",
    description:
      "A high-octane spy thriller where elite agents face deadly missions.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSapJpL_PpzYAOCAGATi0FgAGexDdmAXeIgErt8OS995_j0SDr4F6VcR4tRxth4UqbaWQm52g&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSapJpL_PpzYAOCAGATi0FgAGexDdmAXeIgErt8OS995_j0SDr4F6VcR4tRxth4UqbaWQm52g&s=10",
    releaseDate: "2025",
    cast: ["Hrithik Roshan", "Jr NTR"],
    director: "Ayan Mukerji",
  },

  {
    id: "15",
    title: "Animal",
    rating: 4.3,
    genre: "Action, Crime",
    duration: "3h 21m",
    language: "Hindi",
    description:
      "A dark and intense story about a troubled man whose obsession with his father leads him into a violent world.",
    poster: "https://m.media-amazon.com/images/M/MV5BZThmNDg1NjUtNWJhMC00YjA3LWJiMjItNmM4ZDQ5ZGZiN2Y2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    banner: "https://m.media-amazon.com/images/M/MV5BZThmNDg1NjUtNWJhMC00YjA3LWJiMjItNmM4ZDQ5ZGZiN2Y2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
    releaseDate: "December 2023",
    cast: ["Ranbir Kapoor", "Rashmika Mandanna"],
    director: "Sandeep Reddy Vanga",
  },

  {
    id: "16",
    title: "Jawan",
    rating: 4.4,
    genre: "Action, Thriller",
    duration: "2h 49m",
    language: "Hindi",
    description:
      "A vigilante fights corruption and injustice while uncovering secrets about his past.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3giEteXGggow1hYtpRIuy3bDLO_Z9aoximYp_tuFK0Bb0N_fnmPaChKv1l_mgBxiiOwN3&s=10",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3giEteXGggow1hYtpRIuy3bDLO_Z9aoximYp_tuFK0Bb0N_fnmPaChKv1l_mgBxiiOwN3&s=10",
    releaseDate: "September 2023",
    cast: ["Shah Rukh Khan", "Nayanthara", "Vijay Sethupathi"],
    director: "Atlee",
  },

  {
    id: "17",
    title: "Dhurandhar",
    rating: 4.4,
    genre: "Action, Drama",
    duration: "2h 30m",
    language: "Hindi",
    description:
      "A powerful action drama that follows a fearless man who rises against crime and corruption.",
    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREbxbAvtKCEDqPBdKA2RPDxBVz4H1pS7oWwA&s",
    banner: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREbxbAvtKCEDqPBdKA2RPDxBVz4H1pS7oWwA&s",
    releaseDate: "2025",
    cast: ["Ranveer Singh", "R. Madhavan", "Sanjay Dutt"],
    director: "Aditya Dhar",
  }

];