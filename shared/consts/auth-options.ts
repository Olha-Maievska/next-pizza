import { prisma } from '@/prisma/prisma-client'
import { UserRole } from '@prisma/client'
import { compare, hashSync } from 'bcrypt'
import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || '',
      clientSecret: process.env.GOOGLE_SECRET || '',
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name || profile.login,
          email: profile.email,
          image: profile.avatar_url,
          role: 'USER' as UserRole,
        }
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const values = {
          email: credentials.email,
        }

        const findUser = await prisma.user.findFirst({
          where: values,
        })

        if (!findUser) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          findUser.password
        )

        if (!isPasswordValid) {
          return null
        }

        if (!findUser.verified) {
          return null
        }

        return {
          id: String(findUser.id),
          email: findUser.email,
          role: findUser.role,
          name: findUser.fullname,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === 'credentials') {
          return true
        }

        if (!user.email) {
          return false
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
              { email: user.email },
            ],
          },
        })

        if (findUser) {
          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          })

          return true
        }

        await prisma.user.create({
          data: {
            email: user.email,
            provider: account?.provider,
            providerId: account?.providerAccountId,
            fullname: user.name || 'User #' + user.id,
            verified: new Date(),
            password: hashSync(user.id.toString(), 10),
          },
        })

        return true
      } catch (error) {
        console.error(error)

        return false
      }
    },
    async jwt({ token }) {
      if (!token.email) {
        return token
      }

      const findUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      })

      if (findUser) {
        token.id = String(findUser.id)
        token.role = findUser.role
        token.email = findUser.email
        token.fullname = findUser.fullname
      }

      return token
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id
        session.user.role = token.role
      }

      return session
    },
  },
}
