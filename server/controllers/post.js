import Post from "../models/Post.js";
import User from "../models/User.js";

export const getPost = async (req, res) => {
  const posts = await Post.findAll({
    where: { approved: true },
    include: [{ model: User, attributes: ["id", "name", "email", "userType"] }],
  });

  try {
    res.status(201).json(posts);
  } catch (error) {
    res.status(422).json({
      error: error,
    });
  }
};

export const createPost = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    res.status(422).json({ error: "Please add all the fields" });
  }

  try {
    const post = await Post.create({
      name,
      description,
      postedBy: req.user.id,
    });
    res.status(201).json({ message: "The post created successfully", post });
  } catch (error) {
    res.status(422).json({
      error: error,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(422).json({ error: "Post not found" });
    }

    if (post.postedBy.toString() !== req.user.id.toString()) {
      return res
        .status(401)
        .json({ error: "You are not authorized to delete this post" });
    }

    await post.destroy();
    res.status(201).json({ message: "Successfully deleted" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the post" });
  }
};

export const getNotApprovedPost = async (req, res) => {
    const posts = await Post.findAll({
      where: { approved: false },
      include: [{ model: User, attributes: ["id", "name", "email", "userType"] }],
    });
  
    try {
      res.status(201).json(posts);
    } catch (error) {
      res.status(422).json({
        error: error,
      });
    }
  };

export const approvePost = async (req, res) => {
  const approvepost = await Post.update(
    {approved: true},
    {where: {id: req.params.id}}
  );

  try {
    res.status(201).json({message: "Post approved successfully"});
  } catch (error) {
    res.status(422).json({
      error: error,
    });
  }
};

export const rejectPost = async (req, res) => {
    const rejectpost = await Post.update(
        {approved: false},
        {where: {id: req.params.id}}
      );
    
      try {
        res.status(201).json({message: "Post rejected successfully"});
      } catch (error) {
        res.status(422).json({
          error: error,
        });
      }
};
