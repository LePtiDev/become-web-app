<template>
  <div class="has-header page">
   <b-global-header
      title="Cours"
      primaryButton="Ajouter"
      @button-primary-click="dialogUser = true"
    />
    <v-data-iterator  :items="classeList" :items-per-page.sync="itemsPerPage" :page.sync="page" item-key="name">
        <template v-slot:default="props">
            <v-row no-gutters justify="space-around" class="flex-wrap">
                <v-col v-for="item in props.items" :key="item.title" cols="3">
                    <b-global-card :title="item.title">
                         <template v-slot:headerButton>
                          <b-button title="Modifier"/>
                         </template>
                        <template> 
                            <v-img rounded class="rounded" :src="item.image"/>
                            <p class="mt-3">{{ item.description }}</p>
                        </template>
                    </b-global-card>
                </v-col>
            </v-row>
        </template>
    </v-data-iterator>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import BGlobalCard from "../components/BGlobalCard.vue";
import BGlobalHeader from "../components/headers/BGlobalHeader.vue";
import BButton from "@/components/BButton.vue";


export default Vue.extend({
  name: "Classes",
  components:{
      BGlobalHeader,
      BGlobalCard,
      BButton
  },
  data() {
    return {
        itemsPerPage: 6,
        page: 1,
        classeList:[
              {
                title:"Titre",
                image:"https://media.istockphoto.com/photos/back-view-of-group-of-students-raising-their-arms-during-a-class-at-picture-id1268517553",
                description:"Description du cours de vue js avec ruben le big bg"
              },
               {
                title:"Titre 2",
                image:"https://media.istockphoto.com/photos/back-view-of-group-of-students-raising-their-arms-during-a-class-at-picture-id1268517553",
                description:"Description du cours de vue js avec ruben le big bg"
              },
               {
                title:"Titre 3",
                image:"https://media.istockphoto.com/photos/back-view-of-group-of-students-raising-their-arms-during-a-class-at-picture-id1268517553",
                description:"Description du cours de vue js avec ruben le big bg"
              },
               {
                title:"Titre 4",
                image:"https://media.istockphoto.com/photos/back-view-of-group-of-students-raising-their-arms-during-a-class-at-picture-id1268517553",
                description:"Description du cours de vue js avec ruben le big bg"
              },
               {
                title:"Titre 5",
                image:"https://media.istockphoto.com/photos/back-view-of-group-of-students-raising-their-arms-during-a-class-at-picture-id1268517553",
                description:"Description du cours de vue js avec ruben le big bg"
              },
               {
                title:"Titre",
                image:"https://media.istockphoto.com/photos/back-view-of-group-of-students-raising-their-arms-during-a-class-at-picture-id1268517553",
                description:"Description du cours de vue js avec ruben le big bg"
              },
               {
                title:"Titre",
                image:"https://media.istockphoto.com/photos/back-view-of-group-of-students-raising-their-arms-during-a-class-at-picture-id1268517553",
                description:"Description du cours de vue js avec ruben le big bg"
              },
              {
                title:"Titre 3",
                image:"https://media.istockphoto.com/photos/back-view-of-group-of-students-raising-their-arms-during-a-class-at-picture-id1268517553",
                description:"Description du cours de vue js avec ruben le big bg"
              },
               {
                title:"Titre 4",
                image:"https://media.istockphoto.com/photos/back-view-of-group-of-students-raising-their-arms-during-a-class-at-picture-id1268517553",
                description:"Description du cours de vue js avec ruben le big bg"
              },
               {
                title:"Titre 5",
                image:"https://media.istockphoto.com/photos/back-view-of-group-of-students-raising-their-arms-during-a-class-at-picture-id1268517553",
                description:"Description du cours de vue js avec ruben le big bg"
              },
               {
                title:"Titre",
                image:"https://media.istockphoto.com/photos/back-view-of-group-of-students-raising-their-arms-during-a-class-at-picture-id1268517553",
                description:"Description du cours de vue js avec ruben le big bg"
              },
               {
                title:"Titre",
                image:"https://media.istockphoto.com/photos/back-view-of-group-of-students-raising-their-arms-during-a-class-at-picture-id1268517553",
                description:"Description du cours de vue js avec ruben le big bg"
              },
          ]
    }
  }
});
</script>
