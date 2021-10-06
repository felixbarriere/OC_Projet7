<template>
<!DOCTYPE>
<section id="section_new_post">
    <form >
        <h1 id="h1_new_post">Partagez vos photos</h1>

            <input type="file" name="image" @change="onFileSelected" >
            <!-- <button @click="uploadFile"> Upload </button> -->
            <button id="newPost-btn" type="submit" @click="createPost">Publier</button>
    </form>
</section>
</template>

<script>
import axios from 'axios';
// let user = JSON.parse(localStorage.getItem('user'));

export default {
  name: 'NewPost',
  data() {
      return {
          formData :{
              id_post:'',
              id_user: '',  //user.id
              titre:'',
              texte:'',
              media:''
          }
      }
  },
  methods: {
      onFileSelected(event) {
        console.log(event);
        this.formData.media = event.target.files[0];
        console.log(this.formData.media);
    },
      createPost(e) {
        const formData = new FormData();
        formData.append("image", this.formData.media);
        console.log(this.formData)
        axios.post("http://localhost:3001/api/posts/", this.formData,  {
            headers: {
                // 'Content-Type': 'application/json'
                'Content-Type': 'multipart/form-data; boundary=myboundary'
                // 'Content-Type': 'multipart/form-data'
            }
        })
        .then ((res) => {
        console.log(res);
        alert("votre post a bien été publié");
        // window.location.href="/";
        })
        console.warn(formData);
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