<template>
    <div>
        <div class="card">
            <div class="card-header">Child</div>
            <div class="card-body">
                Child Message {{ childMessage }}
                <div class="form-inline">
                    <input type="text" v-model="childMessage" class="form-control" placeholder="Type Child Message">
                    <button @click="changeParentMessage">Change Parent Message</button>
                    <button @click="changeParentMessage2">Change Parent Message2</button>
                     <button @click="callParentMethod"> Call Parent Method</button>


                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChildComponent',
    data() {
        return {
            childMessage: ''
        }
    },
    methods: {
        changeParentMessage() {
            this.$parent.$data.parentMessage = this.childMessage;
        },
        changeParentMessage2() {
            this.$emit('onChange', this.childMessage);
        },
        childMethod(){
            console.log('Child Parent', this.$parent);
        },
        callParentMethod(){
            this.$parent.parentMethod();
        }
        
    }
 
}

</script>


<style> 

</style>