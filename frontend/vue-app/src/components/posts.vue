<template>
<!DOCTYPE>
  <section>
    <h1 id="h1_post">Bienvenue {{user}} !</h1>
    <div id="post-global" v-for="post in posts.slice().reverse() || []" :key="post.id_post">
      
          
          <h2 id="post-global-title">{{ post.titre}}</h2>
          <p id="post-global-text"> {{ post.texte}} </p>
          <img v-if="post.media != undefined" :src="post.media" alt="image" id="post-global-img"/>
      <router-link :to="{ name:'OnePost', params: {id: post.id_post }}">
          <button id="post-global-btn">Voir plus</button>
      </router-link>
    </div>
  </section>
</template>

<script>
let user = JSON.parse(localStorage.getItem('user'));

export default {
  name: 'Posts',
  data() {
    return {
      posts: [],
      user : user.username 
    }
  },
  mounted() {
    fetch(`http://localhost:3001/api/posts/`)
    .then(res => res.json())
    .then(data => this.posts = data)
    .then(data => console.log(data))
    .catch(err => console.log(err.message))
  }
}
</script>

<style lang="scss">
#post-global { 
  background-color: #183E76;
  color: white;
  border-radius: 15px;
  
  margin: 0.5rem 0;

  &-title { 
    text-decoration: underline;
    padding: 1rem;
  }

  &-text { 
    padding: 1rem;
  }

  &-img { 
    width: 100%;
  }

  &-btn {  
        margin: 1rem;
  }
}

#h1_post { 
    color: black;
  }
</style>