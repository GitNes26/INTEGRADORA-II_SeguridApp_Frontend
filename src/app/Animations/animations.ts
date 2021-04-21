import { style, trigger, state, transition, animate, keyframes } from '@angular/animations';

export const triggerBgToggle =     
    trigger('bgToggle', [
        state('actived', style({
            transform:'rotate(0deg) scale(1)',
            filter: 'brightness(2)'
        })),
        state('desactived', style({
            transform:'rotate(180deg) scale(.5)',
            filter: 'brightness(2)'
        })),
        transition('actived <=> desactived', [
            animate('0.6s')
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

export const triggerBtnReload =
    trigger('reload', [
        // state('actived', style({
        //     transform:'rotate(0deg) scale(1)'
        // })),
        // state('desactived', style({
        //     transform:'rotate(0deg) scale(1)'
        // })),
        transition('hover <=> click', [
            animate('2s cubic-bezier(.075, 0.82, 0.165, 1)',
                keyframes([
                    style({ transform:'rotate(0deg) scale(0.9)', offset:0}),
                    style({ transform:'rotate(900deg) scale(0.8)', offset:0.5}),
                    style({ transform:'rotate(1800deg) scale(1)', offset:1}),
                    // style({ transform:'rotate(0deg) scale(1)', offset:0.90}),
                ])
            )
        ])
    ])