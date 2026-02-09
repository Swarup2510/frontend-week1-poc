import { useState, useEffect } from 'react';
import userService from '../services/userService';
import postService from '../services/postService';
import './Users.css';

function Users() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ title: '', body: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  // Fetch users and posts on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [usersData, postsData] = await Promise.all([
          userService.getAllUsers(),
          postService.getAllPosts(),
        ]);
        setUsers(usersData);
        setPosts(postsData);
      } catch (err) {
        setError(err.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.body.trim()) {
      setSubmitError('Please fill in both title and body');
      return;
    }

    try {
      setIsSubmitting(true);
      setSubmitError(null);
      
      const newPost = await postService.createPost({
        title: formData.title,
        body: formData.body,
        userId: 1
      });

      // Mark newly created posts so we can style them differently
      const annotated = { ...newPost, _isNew: true };

      // Add the new post to the list (show recent first)
      setPosts(prev => [annotated, ...prev]);
      
      // Clear the form
      setFormData({ title: '', body: '' });
    } catch (err) {
      setSubmitError(err.message || 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="users-container">
        <h2>Users & Posts</h2>
        <div className="loading">Loading data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-container">
        <h2>Users & Posts</h2>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="users-container">
      <h2>Users & Posts</h2>
      
      <div className="content-grid">
        {/* Users Section */}
        <section className="users-section">
          <h3>Users ({users.length})</h3>
          {users.length === 0 ? (
            <div className="no-users">No users found</div>
          ) : (
            <div className="users-list">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <h4>{user.name}</h4>
                  <p className="meta"><strong>Username:</strong> @{user.username}</p>
                  <p className="meta"><strong>Full Name:</strong> {user.name}</p>
                  <p className="meta"><strong>Email Address:</strong> {user.email}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Posts Section */}
        <section className="posts-section">
          <h3>Posts ({posts.length})</h3>
          
          {/* Create Post Form */}
          <form className="post-form" onSubmit={handleSubmitPost}>
            <h4>Create New Post</h4>
            
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter post title"
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="body">Body:</label>
              <textarea
                id="body"
                name="body"
                value={formData.body}
                onChange={handleInputChange}
                placeholder="Enter post content"
                rows="4"
                disabled={isSubmitting}
              />
            </div>

            {submitError && <div className="form-error">{submitError}</div>}

            <button 
              type="submit" 
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
          </form>

          {/* Posts List */}
          {posts.length === 0 ? (
            <div className="no-posts">No posts yet</div>
          ) : (
            <div className="posts-list">
              {(showAll ? posts : posts.slice(0, 10)).map(post => (
                <div key={post.id} className={`post-card ${post._isNew ? 'new' : ''}`}>
                  <div className="post-head">
                    <h4>{post.title}</h4>
                    {post._isNew && <span className="badge">New</span>}
                  </div>
                  <p>{post.body}</p>
                  <small>Post ID: {post.id}</small>
                </div>
              ))}

              {posts.length > 10 && (
                <button className="btn-show-more" onClick={() => setShowAll(true)}>Show more posts</button>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Users;
