<script setup>
import { mdiMonitorCellphone, mdiTableBorder, mdiAccountPlus,mdiTableOff, mdiGithub ,mdiAccountStarOutline} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import Specialization from '@/components/Specialization/Specialization.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'


</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccountStarOutline" title="Specializations" main>


      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>

        <Specialization  checkable/>
      </CardBox>


    </SectionMain>
  </LayoutAuthenticated>
</template>
