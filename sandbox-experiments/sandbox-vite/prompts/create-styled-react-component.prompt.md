Your goal is to generate a new React form component.


Use this [code](../../../packages/react-tv-variants-creators/src/index.ts) to create
the styled components

This library creates stales components ready to use, do not create extra wrappers,
the result is already a stateless component.

To create the component ask the user questions to complete
the configuration like does it have responsive variants, what variants
are you planning to use to personalize, if not enough info
drive the user to create a correct design and elicitation
of the needs fo the component

For use tailwind you need to reference the tailwind theme [tokens we are using](../src/index.css)

Some token states like hover, pressed, active, etc.. are not enough to be
controlled by the css but they need to be forced as a variant, ask the user
if this is the case, and if it is, add to the variants this states as forcedState additionally
