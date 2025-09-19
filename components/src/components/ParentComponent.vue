<template>
    <div class="card">
        <div class="card-header">Parent</div>
        <div class="card-body">
            Parrent Message {{ parentMessage }}
        </div>
        <button @click="callChildMethod"> Call Child Method</button>

        <hr>
        <!-- <ChildComponent @onChange="parentMessage = $event"/> -->
        <ChildComponent @onChange="childChanged" ref="child1"/>

    </div>
</template>

<script>
import ChildComponent from './ChildComponent.vue';
export default {
    name: 'ParentComponent',
    data() {
        return {
            parentMessage: ''
        }
    },
    components: {
        ChildComponent
    },
    methods: {
        childChanged(newMessage) {
            this.parentMessage = newMessage;
        },
        callChildMethod() {
            this.$refs.child1.childMethod();
        },
        parentMethod() {
            console.log('Parent Method Called');
        }
    }
   
}


</script>

<style>


</style>