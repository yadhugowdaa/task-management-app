                            />

    < GlassInput
label = "Password"
placeholder = "Enter your password"
value = { password }
onChangeText = { setPassword }
secureTextEntry
    />

                            <GlassButton
                                title="Login"
                                onPress={handleLogin}
                                variant="primary"
                                style={styles.loginButton}
                            />

                            <View style={styles.registerContainer}>
                                <Text
                                    style={[
                                        styles.registerText,
                                        {
                                            color: isDark
                                                ? Colors.dark.textSecondary
                                                : Colors.light.textSecondary,
                                        },
                                    ]}>
                                    Don't have an account?{' '}
                                </Text>
                                <Text
                                    style={[styles.registerLink, { color: Colors.accent.primary }]}
                                    onPress={navigateToRegister}>
                                    Sign Up
                                </Text>
                            </View>
                        </View >
                    </View >
                </ScrollView >
            </KeyboardAvoidingView >
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    logo: {
        fontSize: Typography.sizes.xxxl + 8,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: Typography.sizes.xl,
        textAlign: 'center',
        marginBottom: 48,
    },
    formContainer: {
        width: '100%',
    },
    loginButton: {
        marginTop: 8,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
    },
    registerText: {
        fontSize: Typography.sizes.sm,
    },
    registerLink: {
        fontSize: Typography.sizes.sm,
        fontWeight: '600',
    },
});
