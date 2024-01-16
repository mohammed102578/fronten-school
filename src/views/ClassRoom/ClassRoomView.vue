<script setup>
import { mdiMonitorCellphone, mdiTableBorder, mdiAccountPlus,mdiTableOff, mdiGithub ,mdiAccountStarOutline} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import Classroom from '@/components/Classroom/Classroom.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'


</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccountStarOutline" title="Classrooms" main>


      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <Classroom  checkable/>
      </CardBox>


    </SectionMain>
  </LayoutAuthenticated>
</template>
