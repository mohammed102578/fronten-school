<script setup>
import { mdiMonitorCellphone, mdiTableBorder, mdiAccountPlus,mdiTableOff, mdiGithub ,mdiAccountStarOutline} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import Student from '@/components/Student/StudentEdit.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'



</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccountStarOutline" title="Edit Students" main>


      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <Student  checkable/>
      </CardBox>


    </SectionMain>
  </LayoutAuthenticated>
</template>
