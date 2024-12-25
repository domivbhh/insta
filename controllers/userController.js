const { createClient } = require("redis");
let redisClient = null;


const getRedisInstance = async () => {
  // Create redis instance
  if (!redisClient) {
    redisClient = await createClient({ url: 'rediss://red-ctm18qdds78s73c9b0ug:pScLGE484KZQNF7xW6ZPq78Uq15ctfhq@oregon-redis.render.com:6379' })
      .on('error', err => console.log('Redis Client Error', err))
      .connect();
  }

  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

const PostData = async (req, res, next) => {
  console.log('Entered <Instagram.PostData>')
  let statusCode = 500;
  let response = {
    'message': 'Something went wrong'
  }

  try {
    await getRedisInstance();
    console.log('Got redis instance');

    // Get the user data
    const instaData = JSON.parse(await redisClient.get('insta') || '[]');

    // Store user credentials in redis cache
    instaData.push(req.body);

    await redisClient.set('insta', JSON.stringify(instaData));

    statusCode = 200
    response = {
      status: "sucess",
      message: "Successfully stored the user response"
    }
  } catch (error) {
    console.error('Error occurred while storing user data: ', error);

    statusCode = 400
    response = {
      status: "error",
      message: error
    }
  }

  console.log('Exited <Instagram.PostData>')
  res.status(statusCode).json(response);
}


const GetData = async (req, res, next) => {
  console.log('Entered <Instagram.GetData>')
  let statusCode = 500;
  let response = {
    'message': 'Something went wrong'
  }
  
  try {
    await getRedisInstance();
    console.log('Got redis instance');

    // Get the insta data
    const instaData = await redisClient.get('insta') || '[]';

    statusCode = 200
    response = {
      status: "success",
      data: JSON.parse(instaData)
    }
  } catch (error) {
    console.error('Error occurred while getting user data: ', error);

    statusCode = 400
    response = {
      status: 'error',
      message: error
    }
  }

  console.log('Exited <Instagram.GetData>')
  res.status(statusCode).json(response);
}


module.exports = { PostData, GetData }