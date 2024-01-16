<script setup>
import { mdiMonitorCellphone, mdiTableBorder, mdiAccountPlus,mdiTableOff, mdiGithub ,mdiAccountStarOutline} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import NotificationBar from '@/components/NotificationBar.vue'
import Guardian from '@/components/Guardian/GuardianCreate.vue'
import CardBox from '@/components/CardBox.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxComponentEmpty from '@/components/CardBoxComponentEmpty.vue'


</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccountStarOutline" title="Create Guardian" main>


      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <Guardian  checkable/>
      </CardBox>


    </SectionMain>
  </LayoutAuthenticated>
</template>
