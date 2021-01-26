import t from"../core/Plugin";export default class a extends t{constructor(t){super(t);this.opts=Object.assign({},{minimalScore:3,onValidated:()=>{}},t);this.validatePassword=this.checkPasswordStrength.bind(this);this.validatorValidatedHandler=this.onValidatorValidated.bind(this)}install(){this.core.registerValidator(a.PASSWORD_STRENGTH_VALIDATOR,this.validatePassword);this.core.on("core.validator.validated",this.validatorValidatedHandler);this.core.addField(this.opts.field,{validators:{[a.PASSWORD_STRENGTH_VALIDATOR]:{message:this.opts.message,minimalScore:this.opts.minimalScore}}})}uninstall(){this.core.off("core.validator.validated",this.validatorValidatedHandler);this.core.disableValidator(this.opts.field,a.PASSWORD_STRENGTH_VALIDATOR)}checkPasswordStrength(){return{validate:t=>{const a=t.value;if(a===""){return{valid:true}}const e=zxcvbn(a);const s=e.score;const i=e.feedback.warning||"The password is weak";if(s<this.opts.minimalScore){return{message:i,meta:{message:i,score:s},valid:false}}else{return{meta:{message:i,score:s},valid:true}}}}}onValidatorValidated(t){if(t.field===this.opts.field&&t.validator===a.PASSWORD_STRENGTH_VALIDATOR&&t.result.meta){const a=t.result.meta["message"];const e=t.result.meta["score"];this.opts.onValidated(t.result.valid,a,e)}}}a.PASSWORD_STRENGTH_VALIDATOR="___PasswordStrengthValidator";