"use client";

import { Button, Checkbox, Group, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export default function ContactForm() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            phoneNumber: '',
            message: '',
            termsOfService: false,
        },

        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        },
    });

    return (
        <div className="!border shadow-md rounded-md p-8">
            <form onSubmit={form.onSubmit((values) => console.log(values))}>
                <TextInput

                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    key={form.key('email')}
                    {...form.getInputProps('email')}
                    styles={{
                        label: {
                            marginBottom: "12px",
                        },
                    }}
                />
                <TextInput
                    required
                    label={<span className="form-label">Phone Number</span>}
                    className="w-full"
                    placeholder="22 333 4444"
                    {...form.getInputProps("phoneNumber")}
                    styles={{
                        label: {
                            marginTop: "12px",
                            marginBottom: "12px",
                        },
                    }}
                />
                <Textarea
                    required
                    label={<span className="form-label">Message</span>}
                    className="w-full"
                    autosize
                    minRows={5}
                    maxRows={5}
                    placeholder="Your message"
                    {...form.getInputProps("message")}
                    styles={{
                        label: {
                            marginBottom: "12px",
                            marginTop: "12px",
                        },
                    }}
                />
                <Group justify="center" mt="md">
                    <Button className='!w-full !text-gray-950 hover:text-gray-900 duration-300' variant='filled' color='yellow.4' type="submit">Submit</Button>
                </Group>
            </form>
        </div>
    );
}