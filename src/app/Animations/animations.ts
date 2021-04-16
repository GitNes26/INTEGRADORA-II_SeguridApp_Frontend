import { style, trigger, state, transition, animate } from '@angular/animations';

export const triggerBgToggle = 
    trigger('bgToggle', [
        state('actived', style({
            backgroundColor: '#198754'
        })),
        state('desactived', style({
            backgroundColor: '#DC3545'
        })),
        transition('actived <=> desactived', [
            animate('0.6s cubic-bezier(.075, 0.82, 0.165, 1)')
        ])
    ])

export const triggerToggle = 
    trigger('toggle', [
        state('active', style({
            left: '60%',
        })),
        state('desactived', style({
            left: '0%',
        })),
        transition('actived <=> desactived', [
            animate('0.6s cubic-bezier(.075, 0.82, 0.165, 1)')
        ])
    ])