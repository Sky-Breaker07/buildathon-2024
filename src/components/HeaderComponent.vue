<template>
    <header>
        <div class="container">
            <nav>
                <div class="logo-container">
                    <img src="../assets/images/Logo.svg" alt="Logo">
                    <span>CareLog</span>
                </div>
                <div class="header__btns">
                    <ButtonComponen text="Login" />
                </div>
            </nav>
        </div>
    </header>
</template>

<script setup>
import ButtonComponen from './ButtonComponen.vue';
</script>

<style scoped>
header{
    width: 100%;
    /* height: 62px; */
    border: 1px solid hsla(0, 0%, 84%, 1);
    /* color: hsla(0, 0%, 100%, 1); */
}

.container{
    width: 90rem;
    margin-inline: auto;
    padding: 1rem 2.175rem;
}

nav{
    display: flex;
    align-items: center;
    justify-content:space-between;
}

nav .logo-container{
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

nav .logo-container img{
    width:2.375rem ;
    height:1.8125rem ;
}

nav .logo-container span{
    font-family: "Afacad", sans-serif;
    font-weight: 700;
    size: 1.5rem;
    line-height: 2rem;
    color: hsla(230, 100%, 70%, 1);
    
}


</style>