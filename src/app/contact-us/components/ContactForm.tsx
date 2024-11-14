"use client";

import { Button, Checkbox, Group, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function ContactForm() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            phoneNumber: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
                withAsterisk
                label="Email"
                placeholder="your@email.com"
                key={form.key('email')}
                {...form.getInputProps('email')}
            />
            <TextInput
                required
                label={<span className="form-label">Phone Number</span>}
                className="w-full"
                placeholder="22 333 4444"
                {...form.getInputProps("phoneNumber")}
            />

            

            <Group justify="w-full" mt="md">
                <Button type="submit">Submit</Button>
            </Group>
        </form>
    );
}