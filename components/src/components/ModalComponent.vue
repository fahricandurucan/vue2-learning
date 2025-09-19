<template>
    <div class="modal fade" id="itemModalDetail" tabindex="-1" role="dialog" aria-labelledby="itemModalDetailLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title">{{ title }}</h5>
            
                        </div>
                        <div class="modal-body" v-html="body">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                        </div>
                    </div>
                </div>
            </div>

</template>

<script>
export default {
    name: 'ModalComponent',
    props:{ 
        title: {required: false, default: 'Modal Title'},
        body: {required: false, default: 'Modal Body Content'}
        
    },
    created() {
        window.EventBus.$on('show-modal', (item) => {
            // eslint-disable-next-line vue/no-mutating-props
            this.title = item.title;
            // eslint-disable-next-line vue/no-mutating-props
            this.body = item.detail;
        });
    },

}
</script>