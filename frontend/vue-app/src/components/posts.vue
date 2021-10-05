<template>
<!DOCTYPE>
  <section>
    <h1 id="h1_post">Bienvenue {{user}} !</h1>
    <div id="post-global" v-for="post in posts.slice().reverse() || []" :key="post.id_post">
      <router-link :to="{ name:'OnePost', params: {id: post.id_post }}">
          
          <h2 id="post-global-title">{{ post.titre}}</h2>
          <div id="post-global-text">
              <p>{{ post.texte}}</p>
              <p>{{ post.media}}</p>
          </div>
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
  padding: 0.1rem;
  margin: 0.5rem 0;

  &-title { 
    text-decoration: underline;
  }

  &-comment {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;

    &-answer { 
    width: 100%;
    }
    &-button, &-answer {  
      margin: 0.5rem 0;
    }
  } 
}

#h1_post { 
    color: black;
  }
</style>