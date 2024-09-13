<template>
    <div class="container">
        <section>
            <h2 class="me">Welcome Ajijola Paul</h2>
            <p class="me1">ID: Ajipaul001</p>
            <div class="inner">
                <h2>Department</h2>
                <div class="inputandbutton">
                    <label for="name" class="form_group">
                <input type="text" id="name" placeholder="Department Name" required/>
                   </label>
                   <label for="name" class="form_group">
                <input type="text" id="name" placeholder="Head of Department Name" required/>
                   </label>
                   <ButtonComponen text="+Add New Department"/>
                </div>

                <div class="cardcontainer">

                    <div class="card">
                       <div class="first">
                        <h4>PHYSIOTHERAPY</h4>
                        <p>Department</p>
                       </div>

                       <div class="second">
                        <h3>Agbontale Miracle</h3>
                        <h2>Head of Department</h2>
                        <p>ID:AgbMir002</p>
                       </div>

                       <div class="third">
                        <h3>6</h3>
                        <p>Number of Staff</p>
                        <div class="thebutton">
                            <ButtonComponen text="Edit"/>
                            <ButtonComponen text="Delete"/>
                        </div>
                       </div>
                       

            
                    </div>
                    

                </div>
                
            </div>
        </section>
        
    </div>

</template>

<script setup>
import ButtonComponen from './ButtonComponen.vue';





</script>

<style  scoped>
.container{
    width: 90rem;
    padding-inline: 2.75rem;
    padding-top: 4rem;
    background-color: hsba(0, 0%, 100%, 1);

}

.me{
    width: 20.56rem;
    font-size: 1.5rem;
    height: 2.25rem;
    padding-left: 2.4375rem;
    font-weight: 600;
    font-family: "afacad" sans-serif;
    line-height: 2.25rem;
}

.me1{
    padding: 0rem 2.43rem;
    height: 2.25rem;
    font-weight: 600;
    line-height: 2.25rem;
    font-family: "poppins" sans-serif;
    font-weight: 400;
}

.inner{
    width: 90rem;
    height: 28.31rem;
    padding: 2rem 2.937rem;
    border: 0.1rem solid #677FFF;
    align-content: center;
    justify-content: space-between;



    
}
</style>