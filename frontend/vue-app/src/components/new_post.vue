<template>
<!DOCTYPE>
<section id="section_new_post">
    <form >
        <h1 id="h1_new_post">Que voulez-vous dire?</h1>
            <label>Titre</label>
            <input id="post_titre" v-model="formData.titre" required/>

            <label>Contenu</label>
            <textarea id="post_texte" v-model="formData.texte" required></textarea>
            <input type="file" @change="onFileSelected" >
            <!-- <button @click="uploadFile"> Upload </button> -->
            <button id="newPost-btn" type="submit" @click="createPost">Publier</button>
    </form>
</section>
</template>

<script>
import axios from 'axios';
let user = JSON.parse(localStorage.getItem('user'));

export default {
  name: 'NewPost',
  data() {
      return {
          formData :{
              id_post:'',
              id_user: user.id,
              titre:'',
              texte:'',
              media:''
          }
      }
  },
  methods: {
      onFileSelected(event) {
        console.log(event);
        this.file = event.target.files[0];
        // console.log(this.formData.media);
    },
      createPost(e) {
        // let fileName = this.formData.media;
        // let formData = new FormData();
        // formData.append("content", this.formData);
        // formData.append("image", this.file);

        axios.post("http://localhost:3001/api/posts/", this.formData,  {
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'multipart/form-data; boundary=${formData._boundary}'
                // 'Content-Type': ''
                // 'Content-Type': '',
            }
        })
        .then ((res) => {
        console.log(res);
        alert("votre post a bien été publié");
        // window.location.href="/";
        })
        console.warn(this.formData);
        e.preventDefault();  
    }
  }
}

</script>

<style lang="scss">
#section_new_post {
    max-width: 650px;
    background-color: #183E76;
    margin: 0 auto 1rem auto;
    height: 100%;
    color: white;
    padding: 1.5rem;
    border-radius: 15px;
}

#h1_new_post {
    color: white;
}

form {
    display: flex;
    flex-direction: column;
}
</style>