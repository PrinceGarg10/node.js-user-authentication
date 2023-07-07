const Post = require('../models/userPostModel');

async function getAllPosts(query) {
  try {
    const filter = {}
    if (query.createdBy) {
      filter['createdBy'] = query.createdBy
    }
    if (query.longitude) {
      filter['longitude'] = query.longitude
    }
    if (query.latitude) {
      filter['latitude'] = query.latitude
    }
    const posts = await Post.find(filter);
    return posts;
  } catch (error) {
    throw error;
  }
}

async function createPost(postData) {
  try {
    const post = new Post(postData);
    await post.save();
    return post;
  } catch (error) {
    throw error;
  }
}

async function updatePost(id, createdBy, data) {
  try {
    const post = await Post.findOneAndUpdate({_id: id, createdBy: createdBy}, data, { new: true });
    return post;
  } catch (error) {
    throw error;
  }
}

async function deletePost(id) {
  try {
    return await Post.findByIdAndRemove(id);
  } catch (error) {
    throw error;
  }
}

async function findOnePostByQuery(query) {
  try {
    return await Post.findOne(query)
  }
  catch (error) {
    throw error
  }
}

async function findPostReportForDashboard() {
  try {
    const agg = [
      {
        '$group': {
          '_id': '$isActive',
          'count': {
            '$sum': 1
          }
        }
      }
    ]
    let report =  await Post.aggregate(agg)
    report = report.map((post) => {
      return {
        isActive: post._id,
        ...post
      }
    })
    return report
  }
  catch (error) {
    throw error
  }
}

module.exports = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  findOnePostByQuery,
  findPostReportForDashboard
};
