const mongoose = require('mongoose');
const User = require('./models/User');
const Category = require('./models/Category');
const Post = require('./models/Post');
require('dotenv').config();

// Sample data
const categories = [
  {
    name: 'Technology',
    description: 'Latest tech trends and innovations',
    color: '#3B82F6'
  },
  {
    name: 'Lifestyle',
    description: 'Tips for better living',
    color: '#10B981'
  },
  {
    name: 'Travel',
    description: 'Explore the world',
    color: '#F59E0B'
  }
];

const users = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'admin',
    bio: 'Tech enthusiast and blogger'
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    role: 'user',
    bio: 'Travel lover and lifestyle blogger'
  }
];

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Post.deleteMany({});
    console.log('Cleared existing data');

    // Create categories
    const createdCategories = await Category.insertMany(categories);
    console.log('Created categories');

    // Create users
    const createdUsers = await User.insertMany(users);
    console.log('Created users');

    // Create sample posts
    const posts = [
      {
        title: 'Getting Started with MERN Stack',
        content: 'The MERN stack is a powerful combination of technologies for building modern web applications. MongoDB provides a flexible document database, Express.js offers a minimal web framework for Node.js, React creates dynamic user interfaces, and Node.js serves as the JavaScript runtime environment.\n\nIn this comprehensive guide, we\'ll explore how these technologies work together to create full-stack applications. We\'ll cover the basics of setting up your development environment, creating RESTful APIs, managing state in React, and connecting everything together.\n\nWhether you\'re a beginner or an experienced developer, this guide will help you understand the fundamentals of MERN stack development and get you started on your journey to building amazing web applications.',
        excerpt: 'Learn how to build modern web applications using MongoDB, Express.js, React, and Node.js',
        author: createdUsers[0]._id,
        category: createdCategories[0]._id,
        tags: ['MERN', 'JavaScript', 'Web Development', 'React', 'Node.js'],
        isPublished: true
      },
      {
        title: '10 Tips for Better Work-Life Balance',
        content: 'Maintaining a healthy work-life balance is crucial for your mental health, productivity, and overall well-being. In today\'s fast-paced world, it\'s easy to get caught up in work and forget about the other important aspects of life.\n\nHere are 10 practical tips to help you achieve better work-life balance:\n\n1. Set clear boundaries between work and personal time\n2. Learn to say no to non-essential commitments\n3. Take regular breaks throughout the day\n4. Exercise regularly to reduce stress\n5. Prioritize sleep and maintain a consistent sleep schedule\n6. Use technology wisely and avoid constant connectivity\n7. Delegate tasks when possible\n8. Make time for hobbies and activities you enjoy\n9. Spend quality time with family and friends\n10. Practice mindfulness and stress management techniques\n\nRemember, work-life balance looks different for everyone. Find what works for you and be consistent in maintaining healthy boundaries.',
        excerpt: 'Discover practical strategies to maintain a healthy balance between your professional and personal life',
        author: createdUsers[1]._id,
        category: createdCategories[1]._id,
        tags: ['Lifestyle', 'Wellness', 'Productivity', 'Mental Health'],
        isPublished: true
      },
      {
        title: 'Hidden Gems: 5 Underrated Travel Destinations',
        content: 'While popular tourist destinations have their charm, there\'s something special about discovering hidden gems that haven\'t been overrun by crowds. These underrated destinations offer authentic experiences, stunning landscapes, and rich cultural heritage.\n\n1. **Faroe Islands, Denmark**: Located between Iceland and Norway, these remote islands offer dramatic cliffs, traditional grass-roof houses, and some of the most beautiful Nordic scenery you\'ll ever see.\n\n2. **Svaneti, Georgia**: This mountainous region in Georgia features medieval towers, ancient churches, and breathtaking views of the Caucasus Mountains. It\'s perfect for hiking enthusiasts and culture lovers.\n\n3. **Raja Ampat, Indonesia**: Known as the "Four Kings," this archipelago boasts the richest marine biodiversity on Earth. It\'s a paradise for divers and snorkelers.\n\n4. **Socotra Island, Yemen**: Often called the "Galápagos of the Indian Ocean," this island is home to unique flora and fauna found nowhere else on Earth.\n\n5. **Azores, Portugal**: These volcanic islands in the Atlantic offer hot springs, crater lakes, and charming Portuguese culture without the crowds of mainland Europe.\n\nEach of these destinations offers something unique and unforgettable. Consider adding one of them to your travel bucket list!',
        excerpt: 'Explore five amazing travel destinations that offer incredible experiences away from the tourist crowds',
        author: createdUsers[1]._id,
        category: createdCategories[2]._id,
        tags: ['Travel', 'Adventure', 'Hidden Gems', 'Culture'],
        isPublished: true
      }
    ];

    const createdPosts = await Post.insertMany(posts);
    console.log('Created sample posts');

    console.log('Seed data created successfully!');
    console.log(`Created ${createdCategories.length} categories`);
    console.log(`Created ${createdUsers.length} users`);
    console.log(`Created ${createdPosts.length} posts`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
