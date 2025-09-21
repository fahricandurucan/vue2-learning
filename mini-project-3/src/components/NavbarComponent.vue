<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="">
                    Envanter Takip Projesi
                </a>
                <!-- Toggler düğmesi -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <!-- Form -->
                    <form class="d-flex ms-auto my-2 my-lg-0">
                        <input type="search" class="form-control me-2" placeholder="Ara" aria-label="Ara">
                        <button class="btn btn-success" type="submit">Ara</button>
                    </form>
                </div>
            </div>
        </nav>
    </div>
</template>


<script>
export default {
    name: 'NavbarComponent',
};

</script>